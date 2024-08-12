from pydantic import BaseModel, Field
from decimal import Decimal


class Usuario(BaseModel):
    id: str
    nombre: str
    fondos: Decimal # = Field(gt=-1)
    correo: str
    celular: str

    class Config:
        orm_mode = True