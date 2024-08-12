import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavService } from '../nav-service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private route: ActivatedRoute, private navService: NavService) {}
  ngOnInit() {
    this.navService.setCurrentLocation(window.location.pathname);
  }
  get currentLocation(): string {
    return this.navService.currentLocation;
  }
}
