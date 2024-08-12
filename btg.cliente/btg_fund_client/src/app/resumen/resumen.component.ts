import { Component } from '@angular/core';
import { Usuario } from '../models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user-service';
import { FundListComponent } from '../fund-list/fund-list.component';
import { CuentaListComponent } from '../cuenta-list/cuenta-list.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [FundListComponent, CuentaListComponent, CurrencyPipe],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css',
})
export class ResumenComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id_fondo'));
    // this.usuario = this.userService.usuario;
  }
  get usuario(): Usuario | null {
    return this.userService.usuario;
  }
}
