import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {LoginComponent} from "./auth/login/login/login.component";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, LoginComponent, CommonModule, FontAwesomeModule, FaIconComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'equilibro-dashboard';
  constructor(private router: Router) {}


}
