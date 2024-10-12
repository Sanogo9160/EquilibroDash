import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfilDeSante} from "../models/ProfilDeSante";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfilDeSanteService {

  private apiUrl = `${environment.apiUrl}/profils`;  // URL base du backend

  constructor(private http: HttpClient) {}

  // Headers avec le token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  // Récupération du token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Créer un profil
  creerProfil(profil: ProfilDeSante): Observable<ProfilDeSante> {
    return this.http.post<ProfilDeSante>(`${this.apiUrl}/creer`, profil, { headers: this.getAuthHeaders() });
  }

  // Obtenir un profil par ID
  obtenirProfilParId(id: number): Observable<ProfilDeSante> {
    return this.http.get<ProfilDeSante>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Modifier un profil
  modifierProfil(id: number | undefined, profil: ProfilDeSante): Observable<ProfilDeSante> {
    return this.http.put<ProfilDeSante>(`${this.apiUrl}/modifier/${id}`, profil, { headers: this.getAuthHeaders() });
  }

  // Supprimer un profil
  supprimerProfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }

  // Fetch all profiles
  obtenirTousLesProfils(): Observable<ProfilDeSante[]> {
    return this.http.get<ProfilDeSante[]>(`${this.apiUrl}/liste`, { headers: this.getAuthHeaders() });
  }

}
