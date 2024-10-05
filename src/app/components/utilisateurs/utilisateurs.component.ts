import { Component } from '@angular/core';
import {Utilisateur} from "../../models/Utilisateur";
import {UtilisateurService} from "../../services/utilisateur.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {

  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.obtenirUtilisateurs();
  }

  obtenirUtilisateurs() {
    this.utilisateurService.obtenirTousLesUtilisateurs().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  modifierUtilisateur(id: number) {
    // Rediriger vers le composant de modification (si vous avez un composant pour cela)
    // Utilisez le Router pour naviguer vers la page de modification
  }

  supprimerUtilisateur(id: number) {
    this.utilisateurService.supprimerUtilisateur(id).subscribe(
      () => {
        console.log('Utilisateur supprimé avec succès');
        // Actualiser la liste après suppression
        this.obtenirUtilisateurs();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }


}
