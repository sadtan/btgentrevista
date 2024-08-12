import { Component } from '@angular/core';
import { Fondo, Transaccion } from '../models';
import { FondoService } from '../services/fondo-service';
import { TransaccionService } from '../services/transaccion-service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { NavService } from '../nav-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transaccion-list',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, NgClass],
  templateUrl: './transaccion-list.component.html',
  styleUrl: './transaccion-list.component.css',
})
export class TransaccionListComponent {
  get transacciones(): Transaccion[] | [] {
    return this.fondoService.transacciones;
  }

  constructor(
    private navService: NavService,
    private fondoService: TransaccionService
  ) {
    navService.setCurrentLocation(window.location.pathname);
  }
}
