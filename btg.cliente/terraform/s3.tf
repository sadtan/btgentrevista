
resource "random_pet" "lambda_bucket_name" {
  prefix = "aws-community-builder"
  length = 2
}


resource "aws_s3_bucket" "cliente_bucket" {
  bucket = random_pet.lambda_bucket_name.id
  tags = {
    fondo = "BTG"
  }
}

data "aws_s3_bucket" "selected-bucket" {
  bucket = aws_s3_bucket.cliente_bucket.bucket
}

resource "aws_s3_bucket_website_configuration" "cliente_bucket" {
  bucket = aws_s3_bucket.cliente_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_access_block" {
  bucket = aws_s3_bucket.cliente_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.cliente_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject"
        ]
        Resource = [
          "${aws_s3_bucket.cliente_bucket.arn}/*"
        ]
      }
    ]
  })
}

# resource "aws_s3_object" "object-upload-html" {
#   for_each = fileset("${path.module}/../btg_fund_client/dist/btg_fund_client/browser/", "*")
#   bucket   = aws_s3_bucket.cliente_bucket.bucket
#   key      = each.value
#   source   = "${path.module}/../btg_fund_client/dist/btg_fund_client/browser/${each.value}"
#   etag     = filemd5("${path.module}/../btg_fund_client/dist/btg_fund_client/browser/${each.value}")
#   content_type = each.value
# }

output "s3_bucket_website_endpoint" {
  value       = aws_s3_bucket_website_configuration.cliente_bucket.website_endpoint
  description = "The website endpoint URL"
}

resource "null_resource" "remove_and_upload_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync ${path.module}/../btg_fund_client/dist/btg_fund_client/browser/ s3://${aws_s3_bucket.cliente_bucket.id}"
  }
}