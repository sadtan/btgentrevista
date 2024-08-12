resource "aws_dynamodb_table" "TodoTable" {
  name         = "TodoTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "itemId"
  attribute {
    name = "itemId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "Fondo" {
  name         = "Fondo"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }
  # attribute {
  #   name = "nombre"
  #   type = "S"
  # }
  # attribute {
  #   name = "categoria"
  #   type = "S"
  # }
  # attribute {
  #   name = "monto_minimo_vinculacion"
  #   type = "N"
  # }
}

resource "aws_dynamodb_table" "Usuario" {
  name         = "Usuario"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }
  # attribute {
  #   name = "nombre"
  #   type = "S"
  # }
  # attribute {
  #   name = "fondos"
  #   type = "N"
  # }
  # attribute {
  #   name = "correo"
  #   type = "N"
  # }
  # attribute {
  #   name = "celular"
  #   type = "N"
  # }
}

resource "aws_dynamodb_table_item" "usuario_default" {
  table_name = aws_dynamodb_table.Usuario.name
  hash_key   = aws_dynamodb_table.Usuario.hash_key

   item = <<ITEM
{
  "id": {"S": "1"},
  "nombre": {"S": "Sebastian Palomino"},
  "fondos": {"N": "500000"},
  "correo": {"S": "sebas99.88@gmail.com"},
  "celular": {"S": "+573043523657"}

}
ITEM
}

resource "aws_dynamodb_table" "Cuenta" {
  name         = "Cuenta"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }
  # attribute {
  #   name = "id_usuario"
  #   type = "S"
  # }
  # attribute {
  #   name = "id_fondo"
  #   type = "S"
  # }
  # attribute {
  #   name = "balance"
  #   type = "N"
  # }
  # attribute {
  #   name = "estado"
  #   type = "N"
  # }
  # attribute {
  #   name = "transacciones"
  #   type = "S"
  # }
}

resource "aws_dynamodb_table" "Transaccion" {
  name         = "Transaccion"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }
  # attribute {
  #   name = "fecha"
  #   type = "N"
  # }
  # attribute {
  #   name = "tipo"
  #   type = "S"
  # }
}


resource "aws_dynamodb_table_item" "fondo1" {
  table_name = aws_dynamodb_table.Fondo.name
  hash_key   = aws_dynamodb_table.Fondo.hash_key

   item = <<ITEM
{
  "id": {"S": "1"},
  "nombre": {"S": "FPV_BTG_PACTUAL_RECAUDADORA"},
  "categoria": {"S": "FPV"},
  "monto_minimo_vinculacion": {"N": "75000"}
}
ITEM
}

resource "aws_dynamodb_table_item" "fondo2" {
  table_name = aws_dynamodb_table.Fondo.name
  hash_key   = aws_dynamodb_table.Fondo.hash_key

   item = <<ITEM
{
  "id": {"S": "2"},
  "nombre": {"S": "FPV_BTG_PACTUAL_ECOPETROL"},
  "categoria": {"S": "FPV"},
  "monto_minimo_vinculacion": {"N": "125000"}
}
ITEM
}


resource "aws_dynamodb_table_item" "fondo3" {
  table_name = aws_dynamodb_table.Fondo.name
  hash_key   = aws_dynamodb_table.Fondo.hash_key

   item = <<ITEM
{
  "id": {"S": "3"},
  "nombre": {"S": "DEUDAPRIVADA"},
  "categoria": {"S": "FIC"},
  "monto_minimo_vinculacion": {"N": "50000"}
}
ITEM
}


resource "aws_dynamodb_table_item" "fondo5" {
  table_name = aws_dynamodb_table.Fondo.name
  hash_key   = aws_dynamodb_table.Fondo.hash_key

   item = <<ITEM
{
  "id": {"S": "5"},
  "nombre": {"S": "FDO-ACCIONES"},
  "categoria": {"S": "FIC"},
  "monto_minimo_vinculacion": {"N": "100000"}
}
ITEM
}

resource "aws_dynamodb_table_item" "fondo4" {
  table_name = aws_dynamodb_table.Fondo.name
  hash_key   = aws_dynamodb_table.Fondo.hash_key

   item = <<ITEM
{
  "id": {"S": "4"},
  "nombre": {"S": "FPV_BTG_PACTUAL_DINAMICA"},
  "categoria": {"S": "FIC"},
  "monto_minimo_vinculacion": {"N": "250000"}
}
ITEM
}



