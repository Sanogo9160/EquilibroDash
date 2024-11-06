import { Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfilSanteComponent } from "./components/profil-sante/profil-sante.component";
import { SuiviNutritionnelComponent } from "./components/suivi-nutritionnel/suivi-nutritionnel.component";
import { PlanificationRepasComponent } from "./components/planification-repas/planification-repas.component";
import { UtilisateursComponent } from "./components/utilisateurs/utilisateurs.component";
import { AcceuilComponent } from "./components/acceuil/acceuil.component";
import { RoleComponent } from "./components/role/role.component";
import { ConsultationsComponent } from "./components/consultations/consultations.component";
import { AlertesNotificationsComponent } from "./components/alertes-notifications/alertes-notifications.component";
import { ActivitePhysiqueComponent } from "./components/activite-physique/activite-physique.component";
import { VertusAlimentsComponent } from "./components/vertus-aliments/vertus-aliments.component";
import { RapportsAnalysesComponent } from "./components/rapports-analyses/rapports-analyses.component";
import { CommunauteRessourcesComponent } from "./components/communaute-ressources/communaute-ressources.component";
import { MonProfilComponent } from "./components/mon-profil/mon-profil.component";

export const routes: Routes = [

  // Redirection par défaut vers la page de login
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Routes d'authentification
  { path: 'auth/login', component: LoginComponent },

  // Route protégée par AuthGuard pour le dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Utilisateur authentifié uniquement
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' }, // Redirige /dashboard vers /dashboard/accueil
      { path: 'accueil', component: AcceuilComponent },
      { path: 'profils-sante', component: ProfilSanteComponent },
      { path: 'planification-repas', component: PlanificationRepasComponent },
      { path: 'suivi-nutritionnel', component: SuiviNutritionnelComponent },
      { path: 'consultations', component: ConsultationsComponent },
      { path: 'alertes-notifications', component: AlertesNotificationsComponent },
      { path: 'role', component: RoleComponent },
      { path: 'activite-physique', component: ActivitePhysiqueComponent },
      { path: 'vertus-aliments', component: VertusAlimentsComponent },
      { path: 'rapports-analyses', component: RapportsAnalysesComponent },
      { path: 'communaute-ressources', component: CommunauteRessourcesComponent },
      { path: 'mon-profil', component: MonProfilComponent },
      { path: 'utilisateurs', component: UtilisateursComponent }
    ]
  },

  // Pour gérer les routes inconnues
  { path: '**', redirectTo: '/auth/login' }

];
