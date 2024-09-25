import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfilDeSante} from "../models/ProfilDeSante";

@Injectable({
  providedIn: 'root'
})
export class ProfilDeSanteService {

  private apiUrl = 'http://localhost:8080/api/profils';  // Ton endpoint backend

  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouveau profil de santé
  creerProfil(profil: ProfilDeSante): Observable<ProfilDeSante> {
    return this.http.post<ProfilDeSante>(`${this.apiUrl}/creer`, profil);
  }

  // Méthode pour obtenir un profil de santé par ID
  obtenirProfilParId(id: number): Observable<ProfilDeSante> {
    return this.http.get<ProfilDeSante>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour modifier un profil de santé
  modifierProfil(id: number, profil: ProfilDeSante): Observable<ProfilDeSante> {
    return this.http.put<ProfilDeSante>(`${this.apiUrl}/modifier/${id}`, profil);
  }

  // Méthode pour supprimer un profil de santé par ID
  supprimerProfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }

}
