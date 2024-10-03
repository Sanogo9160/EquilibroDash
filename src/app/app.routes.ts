import { Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProfilDeSanteComponent} from "./components/profil-de-sante/profil-de-sante.component";
import {PlanDeRepasComponent} from "./components/plan-de-repas/plan-de-repas.component";
import {ProgrammeExerciceComponent} from "./components/programme-exercice/programme-exercice.component";
import {ConsultationComponent} from "./components/consultation/consultation.component";
import {NotificationComponent} from "./components/notification/notification.component";
import {RapportComponent} from "./components/rapport/rapport.component";
import {MonprofilComponent} from "./components/monprofil/monprofil.component";
import {CommunauteRessourcesComponent} from "./components/communaute-ressources/communaute-ressources.component";
import {SuiviNutritionnelComponent} from "./components/suivi-nutritionnel/suivi-nutritionnel.component";
import {VertusAlimentsComponent} from "./components/vertus-aliments/vertus-aliments.component";
import {ListeUtilisateurComponent} from "./components/Utilisateur/liste-utilisateur/liste-utilisateur.component";

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Route par défaut redirigée vers la page de login
  { path: 'auth/login', component: LoginComponent }, // Route pour la page de connexion
  { path: 'auth/register', component: RegisterComponent }, // Route pour la page de création de compte
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protège la route Dashboard
  { path: 'profil-sante', component:ProfilDeSanteComponent },
  { path: 'planification-repas', component: PlanDeRepasComponent  },
  { path: 'suivi-nutritionnel', component: SuiviNutritionnelComponent  },
  { path: 'vertus-aliments', component: VertusAlimentsComponent },
  { path: 'alertes-notifications', component: NotificationComponent },
  { path: 'consultations', component: ConsultationComponent  },
  { path: 'activite-physique', component: ProgrammeExerciceComponent },
  { path: 'rapports-analyses', component: RapportComponent },
  { path: 'communaute-ressources', component: CommunauteRessourcesComponent },
  { path: 'utilisateurs',component:ListeUtilisateurComponent},
  { path: 'mon-profil', component: MonprofilComponent  },

];

