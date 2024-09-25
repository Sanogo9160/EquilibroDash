import { Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import {RegisterComponent} from "./auth/register/register.component";

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Route par défaut redirigée vers la page de login
  { path: 'auth/login', component: LoginComponent }, // Route pour la page de connexion
  { path: 'auth/register', component: RegisterComponent }, // Route pour la page de création de compte
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Route protégée par AuthGuard pour le tableau de bord
  { path: '**', redirectTo: '/auth/login' } // Redirection pour les routes non trouvées


];

