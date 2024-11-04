import {Component, OnInit} from '@angular/core';
import {MatTable, MatTableModule} from "@angular/material/table";
import {ProfilDeSanteService} from "../../services/profil-de-sante.service";
import {ProfilDeSante} from "../../models/ProfilDeSante";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {DialogModifierProfilComponent} from "../dialog-modifier-profil/dialog-modifier-profil.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-profil-sante',
  standalone: true,
  imports: [
    MatTable, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule
  ],
  templateUrl: './profil-sante.component.html',
  styleUrl: './profil-sante.component.css'
})
export class ProfilSanteComponent implements OnInit {

  profils: ProfilDeSante[] = [];

  displayedColumns: string[] = ['nom', 'email', 'objectifs', 'allergies', 'maladies', 'preferences'];

  constructor(private profilDeSanteService: ProfilDeSanteService) {}

  ngOnInit(): void {
    this.chargerProfils();
  }

  chargerProfils(): void {
    this.profilDeSanteService.obtenirTousLesProfils().subscribe((data) => {
      this.profils = data;
    });
  }
}
