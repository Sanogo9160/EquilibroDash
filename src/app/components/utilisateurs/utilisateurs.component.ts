import { Component, OnInit, signal } from '@angular/core';
import { Utilisateur } from "../../models/Utilisateur";
import { UtilisateurService } from "../../services/utilisateur.service";
import { CommonModule } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Role } from "../../models/Role";
import { RoleService } from "../../services/role.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];
  utilisateurForm!: FormGroup;
  showAjouterUtilisateur = false;
  utilisateurToEdit?: Utilisateur;
  editMode = false;  // Pour suivre si on est en mode édition
  errorMessage = signal<string | null>(null);

  constructor(
    private utilisateurService: UtilisateurService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
    this.chargerRoles();
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.utilisateurService.obtenirUtilisateurParId(Number(id)).subscribe(utilisateur => {
          if (utilisateur) {
            this.onEdit(utilisateur);
          }
        });
      }
    });
  }

  initForm(): void {
    this.utilisateurForm = this.fb.nonNullable.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],  // Seulement chiffres
      poids: [0, [Validators.required, Validators.min(0)]],               // Nombre positif
      taille: [0, [Validators.required, Validators.min(0)]],              // Nombre positif
      age: [0, [Validators.required, Validators.min(0)]],                 // Nombre positif
      sexe: ['', Validators.required],
      role: [null as Role | null, Validators.required],
      specialite: ['']  // Optionnel, utilisé uniquement pour les diététiciens
    });

    // Gestion dynamique de la validation du champ `specialite` en fonction du rôle
    this.utilisateurForm.get('role')?.valueChanges.subscribe(role => {
      this.gestionValidationDesChamps(role);
    });
  }

  chargerUtilisateurs(): void {
    this.utilisateurService.obtenirTousLesUtilisateurs().subscribe({
      next: (data) => this.utilisateurs = data,
      error: () => this.errorMessage.set("Erreur lors de la récupération des utilisateurs")
    });
  }

  chargerRoles(): void {
    this.roleService.listerRoles().subscribe({
      next: (data) => this.roles = data,
      error: () => this.errorMessage.set("Erreur lors de la récupération des rôles")
    });
  }

  gestionValidationDesChamps(role: Role): void {
    const specialiteControl = this.utilisateurForm.get('specialite');
    if (role?.nom === 'DIETETICIEN') {
      specialiteControl?.setValidators([Validators.required]);
    } else {
      specialiteControl?.clearValidators();
      specialiteControl?.setValue(''); // Efface `specialite` si le rôle n'est pas diététicien
    }
    specialiteControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (!this.utilisateurForm.valid) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    const utilisateurData: any = {
      nom: this.utilisateurForm.value.nom,
      email: this.utilisateurForm.value.email,
      motDePasse: this.utilisateurForm.value.motDePasse,
      telephone: this.utilisateurForm.value.telephone,
      poids: this.utilisateurForm.value.poids,
      taille: this.utilisateurForm.value.taille,
      age: this.utilisateurForm.value.age,
      sexe: this.utilisateurForm.value.sexe,
      role: { id: this.utilisateurForm.value.role.id }
    };

    // Ajout conditionnel de `specialite` si le rôle est `DIETETICIEN`
    if (this.utilisateurForm.value.role.id === 2) {
      utilisateurData.specialite = this.utilisateurForm.value.specialite;
    }

    if (this.editMode && this.utilisateurToEdit && this.utilisateurToEdit.id !== undefined) {
      // Mise à jour de l'utilisateur existant avec une vérification de l'ID
      this.utilisateurService.mettreAJourUtilisateur(this.utilisateurToEdit.id, utilisateurData).subscribe({
        next: () => {
          console.log('Utilisateur mis à jour avec succès');
          this.chargerUtilisateurs();
          this.resetForm();
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
          this.errorMessage.set("Erreur lors de la mise à jour de l'utilisateur");
        }
      });
    } else {
      // Ajout d'un nouvel utilisateur
      this.utilisateurService.ajouterUtilisateur(utilisateurData).subscribe({
        next: () => {
          console.log('Utilisateur créé avec succès');
          this.chargerUtilisateurs();
          this.resetForm();
        },
        error: (err: any) => {
          console.error('Erreur lors de la création de l\'utilisateur:', err);
          this.errorMessage.set("Erreur lors de la création de l'utilisateur");
        }
      });
    }
  }

  resetForm(): void {
    this.utilisateurForm.reset();
    this.showAjouterUtilisateur = false;
    this.utilisateurToEdit = undefined;
    this.editMode = false;  // Désactive le mode édition
  }

  toggleAjouterUtilisateur(): void {
    this.showAjouterUtilisateur = !this.showAjouterUtilisateur;
    if (!this.showAjouterUtilisateur) {
      this.resetForm();
    }
  }

  onEdit(utilisateur: Utilisateur): void {
    this.utilisateurToEdit = utilisateur;
    this.editMode = true;  // Active le mode édition
    this.utilisateurForm.patchValue({
      nom: utilisateur.nom,
      email: utilisateur.email,
      motDePasse: '',  // Ne jamais pré-remplir le mot de passe
      telephone: utilisateur.telephone,
      poids: utilisateur.poids,
      taille: utilisateur.taille,
      age: utilisateur.age,
      sexe: utilisateur.sexe,
      role: utilisateur.role,
      specialite: utilisateur.specialite || ''  // Initialise `specialite` pour les diététiciens
    });
    this.showAjouterUtilisateur = true;
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.supprimerUtilisateur(id).subscribe(() => {
        this.chargerUtilisateurs();
      });
    }
  }
}
