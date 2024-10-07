import { Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import {RegisterComponent} from "./auth/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfilSanteComponent} from "./components/profil-sante/profil-sante.component";
import {SuiviNutritionnelComponent} from "./components/suivi-nutritionnel/suivi-nutritionnel.component";
import {PlanificationRepasComponent} from "./components/planification-repas/planification-repas.component";
import {UtilisateursComponent} from "./components/utilisateurs/utilisateurs.component";
import {AcceuilComponent} from "./components/acceuil/acceuil.component";
import {RoleComponent} from "./components/role/role.component";

export const routes: Routes = [

  // Redirection par défaut vers la page de login
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Routes d'authentification
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // Route protégée par AuthGuard pour le dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Utilisateur authentifié uniquement
    children: [
      { path: 'acceuil', component: AcceuilComponent },
      { path: 'profil-sante', component: ProfilSanteComponent }, // Page Profil de Santé
      { path: 'planification-repas', component: PlanificationRepasComponent }, // Page Planification des Repas
      { path: 'suivi-nutritionnel', component: SuiviNutritionnelComponent }, // Page Suivi Nutritionnel
      { path: 'role', component: RoleComponent },
      { path: 'utilisateurs', component: UtilisateursComponent},
    ]
  },

  // Pour gérer les routes inconnues
  { path: '**', redirectTo: '/auth/login' }

];
