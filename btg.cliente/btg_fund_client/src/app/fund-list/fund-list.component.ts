import { Component } from '@angular/core';
import { products } from '../products';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavService } from '../nav-service';
import { FondoService } from '../services/fondo-service';
import { Fondo, Usuario } from '../models';
import { CurrencyPipe } from '@angular/common';
import { ConfirmVinculacionDialogComponent } from '../confirm-vinculacion-dialog/confirm-vinculacion-dialog.component';
// import { CurrencyFormat } from '../pipes/CurrencyFormat';\

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { cuentaService } from '../services/cuenta-service';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe],
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.css',
})
export class FundListComponent {
  products = [...products];
  share() {
    window.alert('The products has been shared.');
  }
  onNotify() {
    window.alert('You will be notifies when the product goes on sale.');
  }
  constructor(
    private navService: NavService,
    private fondoService: FondoService,
    private dialog: MatDialog,
    private cuentaService: cuentaService,
    private userService: UserService
  ) {
    navService.setCurrentLocation(window.location.pathname);
  }
  get fondos(): Fondo[] | [] {
    return this.fondoService.fondos;
  }
  openDialog(id_fondo: string, nombre: string | null, cantidad: number | null) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.height = 'fit-content';
    dialogConfig.data = {
      id_fondo: id_fondo,
      nombre: nombre,
      cantidad: cantidad,
    };

    const dialogRef = this.dialog.open(
      ConfirmVinculacionDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.vincularCuenta(id_fondo, data['correo']);
      }
    });
  }

  vincularCuenta(id_fondo: string, correo: string): void {
    if (this.usuario) {
      this.cuentaService.vincularCuenta(this.usuario.id, id_fondo, correo);
    }
  }


  get usuario(): Usuario | null {
    return this.userService.usuario;
  }
}
