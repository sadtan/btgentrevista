import { Product } from '../products';
import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';
import { Observable, Subject, map } from 'rxjs';

import { Cuenta, Fondo } from '../models';
import { UserService } from './user-service';
import { TransaccionService } from './transaccion-service';

@Injectable({
  providedIn: 'root',
})
export class cuentaService {
  loadFondos() {
    var environmentConfig = environment();
    return this.httpClient
      .get<Cuenta[]>(environmentConfig.baseUrl + '/cuentas?id_usuario=1', {})
      .subscribe((data) => {
        console.log(data);
        this.cuentas = data;
        // console.log(data);
      });
  }

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UserService,
    private transaccionService: TransaccionService
  ) {
    this.loadFondos();
    this.cuentasChange.subscribe((value) => {
      this.cuentas = value;
    });
  }

  vincularCuenta(id_usuario: string, id_fondo: string, correo: string): void {
    console.log('vinculando cuenta ', correo);
    var environmentConfig = environment();
    this.httpClient
      .post<Cuenta>(environmentConfig.baseUrl + '/cuentas', {
        id_usuario,
        id_fondo,
        correo,
      })
      .subscribe(
        (data) => {
          alert(
            'Se ha vinculado correctamente al fondo.\n\nPor favor verifique su email|spam para ver la  notificación '
          );
          this.transaccionService.loadTransacciones();
          this.loadFondos();
          this.usuarioService.login();
        },
        (error) => {
          alert(error['error']['detail']);
        }
      );
  }

  actualizarCuenta(id_cuenta: string, accion: string): void {
    console.log('actualizando cuenta');
    var environmentConfig = environment();
    this.httpClient
      .put<Cuenta>(environmentConfig.baseUrl + '/cuentas/' + id_cuenta, {
        accion,
      })
      .subscribe(
        (data) => {
          alert('Cuenta actualizada.');
          this.transaccionService.loadTransacciones();

          this.loadFondos();
          this.usuarioService.login();
        },
        (error) => {
          alert(error['error']['detail']);
        }
      );
  }

  cuentas: Cuenta[] = [];
  cuentasChange: Subject<Cuenta[]> = new Subject<Cuenta[]>();
}
