import { Injectable } from '@angular/core';

export interface Adapter<T> {
  adapt(item: any): T | null;
}

export class Usuario {
  constructor(
    public id: string,
    public celular: string,
    public nombre: string,
    public correo: string,
    public fondos: number
  ) {}
}

export class Fondo {
  constructor(
    public id: string,
    public nombre: string | null,
    public categoria: string | null,
    public monto_minimo_vinculacion: number
  ) {}
}


export class Cuenta {
  constructor(
    public id: string,
    public id_usuario: string,
    public id_fondo: string,
    public balance: number,
    public estado: string,

    public transacciones: Transaccion[] | []
  ) {}
}

export class Transaccion {
  constructor(
    public id: string,
    public fecha: string,
    public tipo: string,
    public monto: number,
  ) {}
}
