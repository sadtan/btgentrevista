import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FundListComponent } from './fund-list/fund-list.component';
import { NavComponent } from './nav/nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FundListComponent, NavComponent, NavBarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'btg_fund_client';
  myModel: any;
}
