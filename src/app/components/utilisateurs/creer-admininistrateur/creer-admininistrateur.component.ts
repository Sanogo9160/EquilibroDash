import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {Administrateur} from "../../../models/Administrateur";

@Component({
  selector: 'app-creer-admininistrateur',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './creer-admininistrateur.component.html',
  styleUrl: './creer-admininistrateur.component.css'
})
export class CreerAdmininistrateurComponent {

  administrateurForm: FormGroup;

  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurService) {
    this.administrateurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      telephone: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  onSubmit() {
    const administrateur: Administrateur = this.administrateurForm.value;
    this.utilisateurService.creerAdministrateur(administrateur).subscribe(
      response => {
        console.log('Administrateur créé avec succès', response);
      },
      error => {
        console.error('Erreur lors de la création de l\'administrateur', error);
      }
    );
  }

}
