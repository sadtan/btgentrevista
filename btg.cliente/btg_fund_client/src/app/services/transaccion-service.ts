import { Product } from '../products';
import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';
import { Observable, Subject, map } from 'rxjs';

import { Fondo, Transaccion } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  loadTransacciones() {
    var environmentConfig = environment();
    return (
      this.httpClient
        //el id del usuario se obtendria del servicio, en este caso no teniendo en cuenta que solo hay un usuario
        .get<Transaccion[]>(
          environmentConfig.baseUrl + '/usuarios/1/transacciones',
          {}
        )
        .subscribe((data) => {
          console.log(data);
          data.sort(function (a, b) {
            return (
              new Date(b['fecha']).valueOf() - new Date(a['fecha']).valueOf()
            );
          });
          this.transacciones = data;
        })
    );
  }

  constructor(private httpClient: HttpClient) {
    this.loadTransacciones();
    this.transaccionesChange.subscribe((value) => {
      this.transacciones = value;
    });
  }

  transacciones: Transaccion[] = [];
  transaccionesChange: Subject<Transaccion[]> = new Subject<Transaccion[]>();
}
