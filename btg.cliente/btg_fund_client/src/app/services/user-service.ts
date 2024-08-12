import { Product } from '../products';
import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments';
import { Observable, Subject, map } from 'rxjs';

import { Usuario } from '../models';

export abstract class IUserService {
  abstract addToCart(product: Product): void;
  abstract getItems(): Product[];
  abstract clearCart(): Product[];
  abstract get<Usuario>(): Observable<Usuario | null>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService, OnInit {
  login() {
    var environmentConfig = environment();

    return this.httpClient
      .get<Usuario>(environmentConfig.baseUrl + '/usuarios/1', {})
      .subscribe((data) => {
        this.usuario = data;
      });
  }

  constructor(private httpClient: HttpClient) {
    this.login();
    this.usuarioChange.subscribe((value) => {
      this.usuario = value;
    });
  }

  items: Product[] = [];
  usuario: Usuario | null = null;
  usuarioChange: Subject<Usuario> = new Subject<Usuario>();

  get<Usuario>(
    options: any = {},
    subNode: string = 'data'
  ): Observable<Usuario | null> {
    var environmentConfig = environment();

    return this.httpClient
      .get<Usuario>(environmentConfig.baseUrl + '/usuarios/1', options)
      .pipe(map((data: any) => (subNode ? data[subNode] : data)));
  }

  ngOnInit(): void {
    console.log('INIT');
    var response = this.httpClient;
    var environmentConfig = environment();

    this.httpClient
      .get<Usuario>(environmentConfig.baseUrl + '/usuarios/1', {})
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addToCart(product: Product): void {
    var response = this.httpClient;

    this.items.push(product);
    console.log(this.items);
  }

  getItems(): Product[] {
    console.log(this.items);
    return this.items;
  }

  clearCart(): Product[] {
    this.items = [];
    return this.items;
  }
}
