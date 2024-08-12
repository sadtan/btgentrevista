from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.fondo import Fondo
from app.data.fondo_repo import get_items, create_item
from app.util.logger import log

router = APIRouter()    
    
@router.get("/api/fondos", response_model=list[Fondo])
def get_usuarios():
    return get_items()

@router.post("/api/fondos", response_model=Fondo)
def create_usuario(item: Fondo):
    log.info("creando fondo")
    created_item = create_item(item.model_dump())
    return created_item 
