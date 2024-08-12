import { Component } from '@angular/core';
import { cuentaService } from '../services/cuenta-service';
import { Cuenta, Fondo } from '../models';
import { NgFor } from '@angular/common';
import { FondoService } from '../services/fondo-service';
import { NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cuenta-list',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './cuenta-list.component.html',
  styleUrl: './cuenta-list.component.css',
})
export class CuentaListComponent {
  constructor(
    private cuentaService: cuentaService,
    private fondoService: FondoService
  ) {}

  get cuentas(): Cuenta[] | [] {
    return this.cuentaService.cuentas;
  }

  get fondos(): Fondo[] | [] {
    return this.fondoService.fondos;
  }

  actualizarCuenta(id_cuenta: string, accion: string) {
    this.cuentaService.actualizarCuenta(id_cuenta, accion);
  }

  getFondo(id_fondo: string): Fondo | undefined {
    return this.fondoService.getFondo(id_fondo);
  }
}
