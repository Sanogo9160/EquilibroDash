import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../../models/Utilisateur";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-liste-utilisateur',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent implements OnInit{

  utilisateurs: Utilisateur[] = [];
  loading: boolean = true; // Pour gérer l'état de chargement

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.obtenirUtilisateurs();
  }

  obtenirUtilisateurs(): void {
    this.utilisateurService.obtenirTousLesUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.loading = false; // Fin du chargement
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        this.loading = false; // Fin du chargement même en cas d'erreur
      }
    });
  }
  // Delete a user
  deleteUtilisateur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(id).subscribe(() => {
          this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);  // Remove the deleted user from the list
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        });
    }
  }

  // Approve a user (dummy implementation)
  approuverUtilisateur(id: number): void {
    this.utilisateurService.approuverUtilisateur(id).subscribe(() => {
        console.log('Utilisateur approuvé');
      },
      (error) => {
        console.error('Erreur lors de l\'approbation de l\'utilisateur', error);
      });
  }

  // Navigate to edit page (this assumes you have an edit component)
  editUtilisateur(id: number): void {

    console.log(`Navigating to edit user ${id}`);
  }

}
