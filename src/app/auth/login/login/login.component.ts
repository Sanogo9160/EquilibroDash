import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner,
    MatIcon,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  motDePasse = '';
  errorMessage = '';
  loading = false;  // Propriété pour indiquer l'état de chargement

  constructor(private authService: AuthService, private router: Router) {
  }

  // Méthode appelée lors de la soumission du formulaire de connexion

  onSubmit() {
    this.loading = true;

    this.authService.login(this.email, this.motDePasse).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'Identifiants invalides';
        } else {
          this.errorMessage = 'Erreur de connexion, veuillez réessayer.';
        }
        console.error('Erreur de connexion:', error);
      },
    });
  }

  goToCreateAccount() {
    this.router.navigate(['/register']); // Redirige vers la page de création de compte
  }

}
