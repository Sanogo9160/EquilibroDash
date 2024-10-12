import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/Utilisateur";
import {UtilisateurService} from "../../services/utilisateur.service";
import {CommonModule} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Role} from "../../models/Role";
import {RoleService} from "../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";

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
export class UtilisateursComponent implements OnInit{

  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];
  utilisateurForm!: FormGroup;
  showAjouterUtilisateur = false;
  utilisateurToEdit?: Utilisateur;

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

    // Récupérer l'utilisateur par ID si paramètre 'id' dans l'URL
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

    // Initialisation du formulaire avec validateurs
    this.utilisateurForm = this.fb.nonNullable.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      telephone: ['', Validators.required],
      poids: [''],
      taille: [''],
      age: [0, Validators.required],
      sexe: ['', Validators.required],
      role: [null as Role | null, Validators.required],
      specialite: [''],
    });

    // Gestion dynamique de la validation du champ 'specialite'
    this.utilisateurForm.get('role')?.valueChanges.subscribe(role => {
      if (role) this.gestionValidationDesChamps(role);
    });
  }

  chargerUtilisateurs(): void {
    this.utilisateurService.obtenirTousLesUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
    });
  }

  chargerRoles(): void {
    this.roleService.listerRoles().subscribe(data => {
      this.roles = data;
    });
  }

  gestionValidationDesChamps(role: Role): void {
    const specialiteControl = this.utilisateurForm.get('specialite');

    if (role?.nom === 'DIETETICIEN') {
      specialiteControl?.setValidators([Validators.required]);
    } else {
      specialiteControl?.clearValidators();
    }
    specialiteControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    const role = this.utilisateurForm.value.role.nom;

    this.utilisateurService.ajouterUtilisateur(this.utilisateurForm.value, role).subscribe({
      next: () => {
        console.log('Utilisateur créé avec succès');
        this.router.navigate(['/utilisateurs']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    });
  }

  toggleAjouterUtilisateur(): void {
    this.showAjouterUtilisateur = !this.showAjouterUtilisateur;
  }

  onEdit(utilisateur: Utilisateur): void {
    this.utilisateurToEdit = utilisateur;
    this.utilisateurForm.patchValue(utilisateur);
    this.showAjouterUtilisateur = true;
  }

  onDelete(id: number): void {
    this.utilisateurService.supprimerUtilisateur(id).subscribe(() => {
      this.chargerUtilisateurs();
    });
  }

}

