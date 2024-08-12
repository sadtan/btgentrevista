"# btgentrevista"

[Abrir](http://aws-community-builder-capital-squirrel.s3-website-us-east-1.amazonaws.com)

  

## Synopsis

Entrevista seti, sebastian palomino:

### Tecnologías utilizadas


#### Back End

- Dynamo db | bases de datos no relacionales

- Lambda | Servicio web con python, fastapi y boto3

- Terraform | Orquestración

- API Gateway

- S3 | Almacenamiento

  

#### Front End

- Angular

- S3 | Sitio web estático

  

## Instrucciones para despliegue

  

### Desplegar backend

1. Desplegar la API y base de datos con terraform

```sh

cd ./btg.api

>> terraform init

>> terraform plan

>> terraform apply

```

2. Copiar el link del servicio en las variabels de salida

  
  

### Desplegar el cliente

  

1. Pegar el link en el servicio

  

btg.cliente\btg_fund_client\src\app\api_url.json

```json

{

  "base_url": {

    "sensitive": false,

    "type": "string",

    "value": "<<Link del servicio>>"

  }

}

```

  

2. Compilar el cliente

```sh

cd ./btg.cliente/btg_fund_client

>> ng build --configuration production --base-href

```

  

3. Publicar el cliente

  

```sh

cd ./btg.cliente/terraform

>> ng build --configuration production --base-href

>> terraform init

>> terraform plan

>> terraform apply

  

```

  

3. Abrir el link del cliente en el navegador.