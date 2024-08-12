from pydantic import BaseModel, Field, computed_field
from decimal import Decimal
from .cuenta import Cuenta
from .usuario import Usuario
from app.util.logger import log

import uuid

class Fondo(BaseModel):
    id: str
    nombre: str
    categoria: str
    monto_minimo_vinculacion: Decimal = Field(gt=0)
    
    class Config:
        orm_mode = True
        
    def vincular_cuenta(self, usuario: Usuario) -> Cuenta:
        
        if usuario['fondos'] - self.monto_minimo_vinculacion < 0:
            raise Exception("No tiene saldo disponible para vincularse al fondo " + self.nombre +   ".\Saldo: " + str(usuario['fondos']) + "\Valor de vinculación: " + str(self.monto_minimo_vinculacion))
        
        cuenta = Cuenta(id = str(uuid.uuid4()), 
                        id_usuario = usuario['id'], 
                        id_fondo = self.id, 
                        balance = self.monto_minimo_vinculacion, 
                        estado = "vinculado")

        return cuenta