from fastapi import APIRouter, Depends
from app.models.transaccion import Transaccion
from app.data.cuenta_repo import get_cuenta_by_id, get_cuentas_by_usuario
from fastapi import HTTPException


from app.util.logger import log

router = APIRouter()    

@router.get("/api/cuentas/{id_cuenta}/transacciones", response_model=list[Transaccion])
def read_transacciones(id_cuenta: str):
    log.info("consultando transacciones:" + id_cuenta)
    
    cuenta = get_cuenta_by_id(id_cuenta)
    if (cuenta is None):
        raise HTTPException(status_code=500, detail="La cuenta no existe.")
    
    return cuenta['transacciones']

@router.get("/api/usuarios/{id_usuario}/transacciones", response_model=list[Transaccion])
def get_cuenta_api(id_usuario: str):
    log.info("consultando transacciones de usuario: " + id_usuario)
    
    cuentas = get_cuentas_by_usuario(id_usuario)
    
    if (len(cuentas) is None):
        raise HTTPException(status_code=500, detail="El usuario no tiene cuentas.")
    
    transacciones = []
    
    for cuenta in cuentas:
        transacciones.extend(cuenta['transacciones'])
        
    return transacciones
