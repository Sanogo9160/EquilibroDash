import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LoginComponent} from "../../auth/login/login/login.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatNavList,
    MatListItem,
    MatIcon,
    MatToolbar,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    RouterLink,
    RouterOutlet,
    LoginComponent,
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
