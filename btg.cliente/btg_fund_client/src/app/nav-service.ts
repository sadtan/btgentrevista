import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor() {}

  setCurrentLocation(location: string): void {
    this.currentLocation = location;
    this.locationChange.subscribe((value) => {
      this.currentLocation = value;
    });
  }
  locationChange: Subject<string> = new Subject<string>();

  currentLocation: string = '';
}
