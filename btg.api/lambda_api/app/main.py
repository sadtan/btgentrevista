from fastapi import FastAPI, Response, Request
from mangum import Mangum
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware

from .routers import fondos, cuentas, usuarios, transacciones

app = FastAPI(
    title="Fondos BTG (Entrevista Seti, Sebastian Palomino)",
)



@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(fondos.router, tags=["Fondos"])

app.include_router(cuentas.router, tags=["Cuentas"])
app.include_router(usuarios.router, tags=["Usuarios"])
app.include_router(transacciones.router, tags=["Transacciones"])


@app.middleware("http")
async def check_token(request: Request, call_next):
    headers = request.headers
    
    response = await call_next(request)
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET,PUT"
    
    
    return response

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    # allow_origins = ["*"],
    allow_headers=["*"],
)


handler = Mangum(app)