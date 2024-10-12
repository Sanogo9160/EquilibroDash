import { Component } from '@angular/core';
import {MatTable} from "@angular/material/table";
import {ProfilDeSanteService} from "../../services/profil-de-sante.service";
import {ProfilDeSante} from "../../models/ProfilDeSante";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-profil-sante',
  standalone: true,
  imports: [
    MatTable, CommonModule
  ],
  templateUrl: './profil-sante.component.html',
  styleUrl: './profil-sante.component.css'
})
export class ProfilSanteComponent {

  profilsDeSante: ProfilDeSante[] = [];
  displayedColumns: string[] = ['id', 'utilisateur', 'objectifs', 'allergies', 'actions'];

  constructor(private profilDeSanteService: ProfilDeSanteService) { }

  ngOnInit(): void {
    this.fetchProfils();
  }

  fetchProfils(): void {
    this.profilDeSanteService.obtenirTousLesProfils()
      .subscribe((data: ProfilDeSante[]) => {
        this.profilsDeSante = data;
      });
  }

  onEdit(profil: ProfilDeSante): void {
    // Navigate to edit page or open edit modal
    console.log('Edit profile', profil);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this profile?')) {
      this.profilDeSanteService.supprimerProfil(id)
        .subscribe(() => {
          this.fetchProfils(); // Refresh the list after deletion
        });
    }
  }

}
