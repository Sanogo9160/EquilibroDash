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

  utilisateurs: Utilisateur[] = [];  // Array to store the list of users

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.getAllUtilisateurs();  // Fetch the users when the component is initialized
  }

  // Fetch all users from the service
  getAllUtilisateurs(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
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
