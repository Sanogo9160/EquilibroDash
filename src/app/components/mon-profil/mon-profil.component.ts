import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import { faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mon-profil',
  standalone: true,
  imports: [FontAwesomeModule , CommonModule
  ],
  templateUrl: './mon-profil.component.html',
  styleUrl: './mon-profil.component.css'
})
export class MonProfilComponent {

  utilisateur: any; // Propriété pour stocker les informations de l'utilisateur
  erreur: string | null = null;

  faEdit = faEdit;
  faSignOutAlt = faSignOutAlt;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.chargerUtilisateurActuel();
  }

  chargerUtilisateurActuel(): void {
    this.authService.obtenirUtilisateurActuel().subscribe({
      next: (data) => {
        this.utilisateur = data; // Stocke les informations de l'utilisateur
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des informations utilisateur', err);
        this.erreur = 'Impossible de récupérer les informations de l\'utilisateur';
      }
    });
  }

  modifier(): void {
    // Logique

  }

  quitter(): void {
    this.authService.logout();
  }

}
