import {Component, OnInit} from '@angular/core';
import {Role} from "../../models/Role";
import {RoleService} from "../../services/role.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RouterLink, CommonModule, FaIconComponent, FormsModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit{

  roles: Role[] = [];  // Liste des rôles
  role: Role = { id: null, nom: '' };  // Modèle pour le formulaire de création/édition
  isEditing = false;  // Indicateur si on est en mode édition
  isFormVisible = false;  // Indicateur pour afficher ou cacher le formulaire

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.listerRoles();
  }

  // Liste tous les rôles
  listerRoles(): void {
    this.roleService.listerRoles().subscribe(data => {
      this.roles = data;
    });
  }

  // Supprime un rôle
  supprimerRole(roleId: number): void {
    this.roleService.supprimerRole(roleId).subscribe({
      next: (response) => {
        console.log('Rôle supprimé avec succès');
        this.listerRoles();  // Met à jour la liste après suppression
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du rôle:', error);
      }
    });
  }

  // Affiche le formulaire pour créer un nouveau rôle
  showCreateForm(): void {
    this.isFormVisible = true;
    this.isEditing = false;  // On est en mode création
    this.role = { id: null, nom: '' };  // Réinitialise le formulaire
  }

  // Prépare l'édition d'un rôle et affiche le formulaire
  editRole(role: Role): void {
    this.isFormVisible = true;
    this.isEditing = true;
    this.role = { ...role };  // Clone l'objet pour l'édition
  }

  // Soumet le formulaire pour créer ou mettre à jour un rôle
  onSubmit(): void {
    if (this.isEditing) {
      this.mettreAJourRole(this.role.id!);  // ! indique que l'ID ne sera pas nul
    } else {
      this.creerRole();
    }
  }

  // Création d'un nouveau rôle
  creerRole(): void {
    this.roleService.creerRole(this.role).subscribe({
      next: (response) => {
        console.log('Rôle créé avec succès');
        this.listerRoles();
        this.resetForm();  // Cache le formulaire après la création
      },
      error: (error) => {
        console.error('Erreur lors de la création du rôle:', error);
      }
    });
  }

  // Mise à jour d'un rôle existant
  mettreAJourRole(id: number): void {
    this.roleService.mettreAJourRole(id, this.role).subscribe({
      next: (response) => {
        console.log('Rôle mis à jour avec succès');
        this.listerRoles();
        this.resetForm();  // Cache le formulaire après la mise à jour
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du rôle:', error);
      }
    });
  }

  // Réinitialise le formulaire et cache le formulaire
  resetForm(): void {
    this.isFormVisible = false;
    this.isEditing = false;
    this.role = { id: null, nom: '' };  // Réinitialise les données du formulaire
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;

}
