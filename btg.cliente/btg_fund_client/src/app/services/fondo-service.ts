import { Product } from '../products';
import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';
import { Observable, Subject, map } from 'rxjs';

import { Fondo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FondoService {
  loadFondos() {
    var environmentConfig = environment();
    return this.httpClient
      .get<Fondo[]>(environmentConfig.baseUrl + '/fondos', {})
      .subscribe((data) => {
        console.log(data);
        this.fondos = data;
        // console.log(data);
      });
  }

  getFondo(id_fondo: string): Fondo | undefined {
    return this.fondos.find((f) => f.id == id_fondo);
  }

  constructor(private httpClient: HttpClient) {
    this.loadFondos();
    this.fondosChange.subscribe((value) => {
      this.fondos = value;
    });
  }

  

  fondos: Fondo[] = [];
  fondosChange: Subject<Fondo[]> = new Subject<Fondo[]>();
}
