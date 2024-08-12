
resource "random_pet" "lambda_bucket_name" {
  prefix = "aws-community-builder"
  length = 2
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.lambda_bucket.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket     = aws_s3_bucket.lambda_bucket.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]

}

data "archive_file" "app" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_api"
  output_path = "${path.module}/app.zip"
  excludes = ["${path.module}/lambda_api/app/requirements.txt", "${path.module}/lambda_api/app/tests/**"]

}

resource "aws_s3_object" "lambda_app" {
  bucket = aws_s3_bucket.lambda_bucket.id
  key    = "app.zip"
  source = data.archive_file.app.output_path
  etag   = filemd5(data.archive_file.app.output_path)
}


resource "aws_lambda_function" "seti_api" {
  function_name    = "BTGFunds"
  s3_bucket        = aws_s3_bucket.lambda_bucket.id
  s3_key           = aws_s3_object.lambda_app.key
  runtime          = var.python_runtime
  handler          = "app.main.handler"
  source_code_hash = data.archive_file.app.output_base64sha256
  role             = aws_iam_role.lambda_exec.arn
  layers           = [aws_lambda_layer_version.lambda_layer.arn]
  logging_config {
    log_format = "Text"
  }
}

resource "aws_cloudwatch_log_group" "seti_api_log" {
  name              = "/aws/lambda/${aws_lambda_function.seti_api.function_name}"
  retention_in_days = 14
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }

    ]
  })
}

data "aws_iam_policy_document" "lambda_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:BatchGet*",
      "dynamodb:DescribeStream",
      "dynamodb:DescribeTable",
      "dynamodb:Get*",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWrite*",
      "dynamodb:CreateTable",
      "dynamodb:Delete*",
      "dynamodb:Update*",
      "dynamodb:PutItem",
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "ses:*"
    ]
    resources = [
      aws_dynamodb_table.TodoTable.arn,
      aws_dynamodb_table.Fondo.arn,
      aws_dynamodb_table.Usuario.arn,
      aws_dynamodb_table.Cuenta.arn,
      aws_dynamodb_table.Transaccion.arn,
      "arn:aws:logs:*:*:*",
      "*"
    ]
  }
}

resource "aws_iam_policy" "dynamodb_lambda_policy" {
  name        = "dynamodb-lambda-policy"
  description = "This policy will be used by the lambda to write get data from DynamoDB"
  policy      = data.aws_iam_policy_document.lambda_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.dynamodb_lambda_policy.arn

  # policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_lambda_function_url" "seti_api_url" {
  function_name      = aws_lambda_function.seti_api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"]
    allow_headers     = ["*"]
    expose_headers    = ["*"]
    max_age           = 86400
  }


}


data "archive_file" "layer" {
  type        = "zip"
  source_dir  = "${path.module}/layer"
  output_path = "${path.module}/layer.zip"
}

resource "aws_lambda_layer_version" "lambda_layer" {
  filename                 = data.archive_file.layer.output_path
  layer_name               = "community-layer"
  source_code_hash         = data.archive_file.layer.output_base64sha256
  compatible_runtimes      = [var.python_runtime]
  compatible_architectures = ["x86_64"]
}

resource "null_resource" "pip_install" {
  triggers = {
    shell_hash = sha256(file("${path.module}/lambda_api/app/requirements.txt"))
  }

  provisioner "local-exec" {
    command = "pip install -r ${path.module}/lambda_api/app/requirements.txt -t ${path.module}/layer/python --platform manylinux2014_x86_64 --implementation cp --python-version 3.12 --only-binary=:all: --upgrade"
  }

  depends_on = [data.archive_file.layer]
}

# resource "aws_dynamodb_table" "TodoTable" {
#   name         = "TodoTable"
#   billing_mode = "PAY_PER_REQUEST"
#   hash_key     = "itemId"
#   # read_capacity = 5
#   # write_capacity = 6
#   attribute {
#     name = "itemId"
#     type = "S"
#   }
# }

