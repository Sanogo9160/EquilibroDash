import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login/login.component";
import {AuthService} from "./auth/auth.service";
import {CommonModule} from "@angular/common";
import {ListeUtilisateurComponent} from "./components/Utilisateur/liste-utilisateur/liste-utilisateur.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, LoginComponent, CommonModule, ListeUtilisateurComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'equilibro-dashboard';
  constructor(private router: Router) {}


}
