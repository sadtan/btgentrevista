import boto3
import uuid

from botocore.exceptions import ClientError
from fastapi import HTTPException
import datetime
from app.models.transaccion import Transaccion

from app.util.logger import log
from .fondo_repo import get_item as get_fondo
from .db import db

from boto3.dynamodb.conditions import Key, Attr

table = db.Table('Cuenta')
tableUsuario = db.Table('Usuario')
tableFondo = db.Table('Fondo')

def get_items():
    response = table.scan()
    return response.get('Items', [])

def get_cuenta_by_id(id):
    response = table.get_item(Key={'id': id})
    return response.get('Item', None)

def get_cuentas_by_usuario(id_usuario):
    response = table.scan(
        FilterExpression=Attr('id_usuario').eq(id_usuario) 
    )
    return response.get('Items', [])

def get_cuenta(id_usuario, id_fondo):
    response = table.scan(
        FilterExpression=Attr('id_usuario').eq(id_usuario) & Attr('id_fondo').eq(id_fondo)
    )
    return response.get('Items', [])

def list_by_usuario(id_usuario):
    response = table.scan(
        FilterExpression=Attr('id_usuario').eq(id_usuario)
    )
    return response.get('Items', [])

def put_cuenta(item):
    try:
        response = table.put_item(Item=item)
        return item # Return the created item itself
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))