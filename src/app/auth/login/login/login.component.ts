import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
    this.loading = true;  // Active le spinner de chargement

    this.authService.login(this.email, this.motDePasse).subscribe({
      next: (response) => {
        this.loading = false;  // Désactive le spinner
        this.router.navigate(['/dashboard']); // Redirige après connexion
      },
      error: (error) => {
        this.loading = false;  // Désactive le spinner en cas d'erreur
        this.errorMessage = 'Erreur de connexion, veuillez vérifier vos identifiants';
      },
    });
  }

  goToCreateAccount() {
    this.router.navigate(['/register']); // Redirige vers la page de création de compte
  }

}
