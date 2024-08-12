import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FundListComponent } from './fund-list/fund-list.component';
import { CartComponent } from './cart/cart.component';
import { ResumenComponent } from './resumen/resumen.component';
import { TransaccionListComponent } from './transaccion-list/transaccion-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ResumenComponent,
  },
  {
    path: 'funds/:id_fondo',
    component: ProductDetailsComponent,
  },
  {
    path: 'transacciones',
    component: TransaccionListComponent,
  },
];
