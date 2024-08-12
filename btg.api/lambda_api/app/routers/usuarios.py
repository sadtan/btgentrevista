from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from botocore.exceptions import ClientError
from fastapi import HTTPException
from app.models.usuario import Usuario
from app.data.usuario_repo import get_usuarios as list_usuarios, put_usuario, get_usuario as get_usuario_by_id
from app.util.logger import log

router = APIRouter()    
    
@router.get("/api/usuarios", response_model=list[Usuario])
def get_usuarios():
    return list_usuarios()

@router.get("/api/usuarios/{id_usuario}", response_model=Usuario)
def get_usuario(id_usuario: str):
    usuario = get_usuario_by_id(id_usuario)
    if (usuario is None):
        raise HTTPException(status_code=500, detail="El usuario no existe")

    return usuario

@router.post("/api/usuarios", response_model=Usuario)
def create_usuario(item: Usuario):
    created_item = put_usuario(item.model_dump())
    return created_item # Ensure that create_item returns the item itself
