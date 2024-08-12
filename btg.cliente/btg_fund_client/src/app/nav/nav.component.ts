import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
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
