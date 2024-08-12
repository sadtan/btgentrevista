from pydantic import BaseModel, Field
from .transaccion import Transaccion
import datetime
import uuid
from app.util.time import get_current_date_str
from app.util.logger import log
from decimal import Decimal


class Cuenta(BaseModel):
    id: str
    id_usuario: str
    id_fondo: str
    balance: Decimal
    estado: str
    transacciones: list[Transaccion]  = []
    
    class Config:
        orm_mode = True
        
    def __init__(self, 
        id: str,
        id_usuario: str,
        id_fondo: str,
        balance: float,
        estado: str,
        transacciones: list[Transaccion]  = []
        ):
        if len(transacciones)  == 0:
            transaccion = Transaccion(id = str(uuid.uuid4()), fecha = get_current_date_str(), tipo = "vinculación", monto = balance)
            transacciones = [transaccion]
        
        super().__init__(
            id = id,
            id_usuario = id_usuario,
            id_fondo = id_fondo,
            balance = balance,
            estado = estado,
            transacciones = transacciones
        )
        # Look up the id from the database
        # db_result = get_db_content(id)  
        # kwargs.update(db_result)
            
    def desvincular(self) -> Decimal:
        if (self.estado == "desvinculado"):
            raise Exception("El usuario ya está desvinculado")
        
        balance_disponible = self.balance
        
        self.estado = "desvinculado"
        transaccion = Transaccion(id = str(uuid.uuid4()), fecha = get_current_date_str() , tipo = "retiro", monto = -self.balance)
        self.transacciones.append(transaccion)
        self.balance = 0
        
        return balance_disponible
        
    def vincular(self, monto):
        if (self.estado == "vinculado"):
            raise Exception("El usuario ya está vinculado")

        self.estado = "vinculado"
        transaccion = Transaccion(id = str(uuid.uuid4()), fecha = get_current_date_str() , tipo = "consignacion", monto = monto)
        self.transacciones.append(transaccion)
        self.balance = self.balance + monto
        
class crear_cuenta_request(BaseModel):
    id_fondo: str
    id_usuario: str
    correo: str | None
    

    
class update_cuenta_request(BaseModel):
    accion: str