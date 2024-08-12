import { Component } from '@angular/core';
import { Product } from '../products';
import { CurrencyPipe, NgFor } from '@angular/common';

import { NavService } from '../nav-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private navService: NavService) {
    navService.setCurrentLocation(window.location.pathname);
  }
}
