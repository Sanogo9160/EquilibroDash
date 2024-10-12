import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }


}
