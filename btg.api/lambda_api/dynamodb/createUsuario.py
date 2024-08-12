import boto3
dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')
try:
    table = dynamodb.create_table(
    TableName='Usuario',
    KeySchema=[
    {
    'AttributeName': 'id',
    'KeyType': 'HASH'
    }
    ],
    AttributeDefinitions=[
    {
    'AttributeName': 'id',
    'AttributeType': 'S'
    }
    ],
    ProvisionedThroughput={
    'ReadCapacityUnits': 5,
    'WriteCapacityUnits': 5
    }
    )
    print("Table status:", table.table_status)
except Exception as e:
    print('error', e)