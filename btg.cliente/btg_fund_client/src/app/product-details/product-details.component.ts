import { Component, OnInit } from '@angular/core';
import { Product, products } from '../products';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuario } from '../models';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, CurrencyPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  // usuario: Usuario | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id_fondo'));

    // Find the product that correspond with the id provided in route.
    this.product = products.find(
      (product) => product.id === productIdFromRoute
    );

    // this.usuario = this.userService.usuario;
  }
  addToCart(product: Product) {
    this.userService.addToCart(product);
    // this.usuario = this.userService.usuario;
    // window.alert('Your product has been added to the cart!');
  }

  get usuario(): Usuario | null {
    return this.userService.usuario;
  }
}
