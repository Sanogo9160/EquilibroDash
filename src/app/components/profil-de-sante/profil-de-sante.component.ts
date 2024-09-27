import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProfilDeSante} from "../../models/ProfilDeSante";
import {ProfilDeSanteService} from "../../services/profil-de-sante.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-profil-de-sante',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './profil-de-sante.component.html',
  styleUrl: './profil-de-sante.component.css'
})
export class ProfilDeSanteComponent {

  profilDeSante!: ProfilDeSante;
  loading = false;
  errorMessage = '';

  constructor(
    private profildeService: ProfilDeSanteService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProfilDeSante();
  }

  // Récupérer le profil via le service
  getProfilDeSante(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Récupération de l'ID via l'URL
    this.loading = true;

    this.profildeService.obtenirProfilParId(id).subscribe({
      next: (profil) => {
        this.profilDeSante = profil;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de récupérer le profil.';
        this.loading = false;
      },
    });
  }

  // Mettre à jour le profil
  updateProfil(): void {
    this.loading = true;

    this.profildeService.modifierProfil(this.profilDeSante.id, this.profilDeSante).subscribe({
      next: () => {
        this.snackBar.open('Profil mis à jour avec succès', 'Fermer', { duration: 3000 });
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 3000 });
        this.loading = false;
      },
    });
  }
}


