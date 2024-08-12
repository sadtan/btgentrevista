import boto3
dynamodb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

# table = dynamodb.Table("Cuenta")
# table.delete()

# print(f"Deleting {table.name}...")
# table.wait_until_not_exists()



try:
    table = dynamodb.create_table(
    TableName='Cuenta',
    KeySchema=[
    {
    'AttributeName': 'id',
    'KeyType': 'HASH'
    },
   
    ],
    AttributeDefinitions=[
    {
    'AttributeName': 'id',
    'AttributeType': 'S'
    },
    
    ],
    ProvisionedThroughput={
    'ReadCapacityUnits': 5,
    'WriteCapacityUnits': 5
    }
    )
    print("Table status:", table.table_status)
except Exception as e:
    print('error', e)