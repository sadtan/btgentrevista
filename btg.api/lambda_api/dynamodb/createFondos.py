import boto3
dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

dynamodb.delete(TableName='Fondo')



# try:
#     table = dynamodb.create_table(
#     TableName='Fondo',
#     KeySchema=[
#     {
#     'AttributeName': 'id',
#     'KeyType': 'HASH'
#     },
#     {
#     'AttributeName': 'id_usuario',
#     'KeyType': 'HASH'
#     },
#     {
#     'AttributeName': 'id_fondo',
#     'KeyType': 'HASH'
#     }
#     ],
#     AttributeDefinitions=[
#     {
#     'AttributeName': 'id',
#     'AttributeType': 'S'
#     },
#     {
#     'AttributeName': 'id_fondo',
#     'AttributeType': 'S'
#     },
#      {
#     'AttributeName': 'id_usuario',
#     'AttributeType': 'S'
#     }
#     ],
#     ProvisionedThroughput={
#     'ReadCapacityUnits': 5,
#     'WriteCapacityUnits': 5
#     }
#     )
#     print("Table status:", table.table_status)
# except Exception as e:
#     print('error', e)