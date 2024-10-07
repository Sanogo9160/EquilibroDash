import { Component } from '@angular/core';
import {Utilisateur} from "../../models/Utilisateur";
import {UtilisateurService} from "../../services/utilisateur.service";
import {CommonModule} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {

  utilisateurs: Utilisateur[] = []; // Liste des utilisateurs
  errorMessage: string = '';
  showAjouterUtilisateur: boolean = false; // Variable pour afficher/masquer le formulaire
  roles: string[] = ['ADMINISTRATEUR', 'DIETETICIEN', 'UTILISATEUR']; // Liste des rôles
  utilisateurForm: FormGroup; // Formulaire pour l'ajout d'utilisateur

  constructor(private utilisateurService: UtilisateurService, private fb: FormBuilder) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      telephone: ['', Validators.required],
      role: ['', Validators.required], // Rôle à sélectionner
    });
  }

  ngOnInit(): void {
    this.loadUtilisateurs(); // Charger les utilisateurs au démarrage
  }

  loadUtilisateurs(): void {
    this.utilisateurService.obtenirTousLesUtilisateurs().subscribe({
      next: (data: Utilisateur[]) => {
        this.utilisateurs = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la récupération des utilisateurs';
      }
    });
  }

  // Afficher/Masquer le formulaire d'ajout
  toggleAjouterUtilisateur(): void {
    this.showAjouterUtilisateur = !this.showAjouterUtilisateur;
  }

  // Soumettre le formulaire pour créer un nouvel utilisateur
  onSubmit(): void {
    if (this.utilisateurForm.valid) {
      const formData = this.utilisateurForm.value;

      // Appeler le service pour créer l'utilisateur
      this.utilisateurService.creerUtilisateur(formData).subscribe({
        next: (utilisateur) => {
          // Ajouter le nouvel utilisateur à la liste
          this.utilisateurs.push(utilisateur);
          // Masquer le formulaire et réinitialiser les champs
          this.showAjouterUtilisateur = false;
          this.utilisateurForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'utilisateur', err);
          this.errorMessage = 'Erreur lors de la création de l\'utilisateur';
        }
      });
    }
  }

  onEdit(utilisateur: Utilisateur): void {
    console.log('Modifier utilisateur', utilisateur);
    // Implémenter la logique pour modifier l'utilisateur
  }


  onDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurService.supprimerUtilisateur(id).subscribe({
        next: () => {
          // Mise à jour de la liste des utilisateurs après suppression
          this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.errorMessage = 'Erreur lors de la suppression de l\'utilisateur';
        }
      });
    }
  }


  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;


}
