import boto3

from fastapi import APIRouter, Depends
from app.models.cuenta import Cuenta, crear_cuenta_request, update_cuenta_request
from app.models.transaccion import Transaccion
from app.data.fondo_repo import get_item as get_fondo
from app.data.usuario_repo import get_usuario, put_usuario
from app.data.cuenta_repo import get_items, get_cuenta, get_cuenta_by_id, list_by_usuario, put_cuenta as put_cuenta
from app.models.fondo import Fondo
from app.models.usuario import Usuario
from botocore.exceptions import ClientError
from fastapi import HTTPException


from app.util.logger import log

router = APIRouter()    
    
@router.get("/cuentas", response_model=list[Cuenta])
def read_todo_items():
    return get_items()

@router.get("/api/cuentas/{id_cuenta}", response_model=Cuenta)
def get_cuenta_api(id_cuenta: str):
    log.info("consultando cuenta:" + id_cuenta)
        
    cuenta = get_cuenta_by_id(id_cuenta)
    if (cuenta is None):
        raise HTTPException(status_code=500, detail="La cuenta no existe.")
    
    return cuenta
    
@router.put("/api/cuentas/{id_cuenta}", response_model=Cuenta)
def update_cuenta(id_cuenta: str, request: update_cuenta_request):
    accion = request.model_dump()['accion']
    log.info("actualizando cuenta:" + accion)
    
    cuenta = get_cuenta_by_id(id_cuenta)
    if (cuenta is None):
        raise HTTPException(status_code=500, detail="La cuenta no existe.")

    db_fondo = get_fondo(cuenta['id_fondo'])
    if (db_fondo is None):
        raise HTTPException(status_code=500, detail="El fondo no existe")

    usuario = get_usuario(cuenta['id_usuario']) 
    if (usuario is None):
        raise HTTPException(status_code=500, detail="El usuario no existe.")
    
    cuenta = Cuenta.parse_obj(cuenta)
    
    
    # volver a trer al fondo, la tarifa de vinculación puede cambiar (?)
    try: 
        if accion == "vincular":
            if usuario['fondos'] - db_fondo['monto_minimo_vinculacion'] <= 0:
                HTTPException(status_code=500, detail="Fondos insuficientes.")
            
            cuenta.vincular(db_fondo['monto_minimo_vinculacion'])
            usuario['fondos'] = usuario['fondos'] - db_fondo['monto_minimo_vinculacion']
        
        elif accion == "desvincular":
            # devolver el balance completo si la cuenta ha tenido algun rendimiento
            balance_disponible = cuenta.desvincular()
            usuario['fondos'] = usuario['fondos'] + balance_disponible
            
        else: 
            HTTPException(status_code=500, detail="La cuenta no existe.")

        put_cuenta(cuenta.model_dump())
        put_usuario(usuario)
        
        return cuenta
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# en este caso el id del usuario seria un token en el header
@router.get("/api/cuentas", response_model=list[Cuenta])
def get_cuentas(id_usuario: str):
    log.info("consultando cuentas:" + id_usuario)
    
    if not id_usuario:
        raise HTTPException(status_code=500, detail="Error de autenticación.")

    cuentas = list_by_usuario(id_usuario)
    return cuentas


@router.post("/api/cuentas", response_model=Cuenta)
def crear_cuenta(item: crear_cuenta_request):
    log.info("vinculando cuenta")
    log.info(item);
    
    request = item.model_dump()

    db_usuario = get_usuario(request['id_usuario'])
    db_fondo = get_fondo(request['id_fondo'])
    
    if db_usuario is None or db_fondo is None:
        raise HTTPException(status_code=500, detail="El usuario o el fondo no existen.")
        
    db_cuentas = get_cuenta(request['id_usuario'], request['id_fondo'])
    if (len(db_cuentas) > 0):
        raise HTTPException(status_code=500, detail="El usuario ya tiene una cuenta.")
    
    usuario = Usuario.parse_obj(db_usuario)
    fondo = Fondo.parse_obj(db_fondo)
    
    try:
        cuenta = fondo.vincular_cuenta(usuario.model_dump())
        # cuenta creada, guardar en la base de datos
        put_cuenta(cuenta.model_dump())
        usuario = usuario.model_dump()
        
        
        usuario['fondos'] = usuario['fondos'] - cuenta.model_dump()['balance']
        put_usuario(usuario)
        
        html = f"<h3>Se ha suscrito al fondo {db_fondo['nombre']}</h3><br/>"
        html += f"Se han debidato de su cuenta {cuenta.model_dump()['balance']}<br/><br/><br/>"
        html += f"Mensaje autogenerado del Fondo BTG"
        
        send_args = {
            "Source": "sebas99.88@gmail.com",
            "Destination": {'ToAddresses': ['sebastian.palomino@hpe.com', 'recipient_2@email.com']} ,
            "Message": {
                "Subject": {"Data": "SUBJECT"},
                "Body": {"Text": {"Data": "---"}, "Html": {"Data": html}},
            },
        }
        try:
            ses_client = boto3.client('ses')
            response = ses_client.send_email(**send_args)
        except ClientError:
            log.exception(
                "Couldn't send mail from %s to %s."
            )
            raise
    
       
        return cuenta.model_dump()
        
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
    
