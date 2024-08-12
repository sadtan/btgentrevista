import boto3
import os
from app.util.logger import log

db = boto3.resource('dynamodb')
# endpoint_url="http://localhost:8000"