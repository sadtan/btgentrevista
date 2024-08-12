from pydantic import BaseModel, Field
from decimal import Decimal

class Transaccion(BaseModel):
    id: str
    fecha: str
    tipo: str
    monto: Decimal
    
    class Config:
        orm_mode = True

    