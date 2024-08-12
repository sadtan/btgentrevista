from botocore.exceptions import ClientError
from fastapi import HTTPException
from app.util.logger import log
from .db import db

db
table = db.Table('Usuario')

def get_usuarios():
    response = table.scan()
    return response.get('Items', [])

def get_usuario(item_id):
    response = table.get_item(Key={'id': item_id})
    return response.get('Item', None)

def put_usuario(item):
    try:
        response = table.put_item(Item=item)
        return item 
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))