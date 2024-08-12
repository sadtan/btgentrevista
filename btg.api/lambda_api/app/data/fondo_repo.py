import boto3
import uuid

from botocore.exceptions import ClientError
from fastapi import HTTPException
from app.data.db import db


table = db.Table('Fondo')

def get_items():
    response = table.scan()
    return response.get('Items', [])

def get_item(item_id):
    response = table.get_item(Key={'id': item_id})
    return response.get('Item', None)

def create_item(item):
    try:
        response = table.put_item(Item=item)
        return item # Return the created item itself
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))