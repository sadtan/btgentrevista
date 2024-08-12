from fastapi import FastAPI
from fastapi.testclient import TestClient
from data.itemRepository import common_parameters
import uuid
from ..main import app

client = TestClient(app)

def create():
    response = client.get("/")
    print(response.json())
    assert response.status_code == 200
    assert response.json() == {'message': 'Hello World'}
    
def test_post_roo():
    id = str(uuid.uuid4())
    response = client.post("/items", 
                           json = {"itemId": "id", "title": "new item title with guid", "description": "description", "done": True} 
                           )
    assert response.status_code == 200
    # assert response.json() == {"itemId": "id", "title": "new item title with guid", "description": "description", "done": True} 
    
    