import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ProfilDeSante} from "../models/ProfilDeSante";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfilDeSanteService {

  private apiUrl = `${environment.apiUrl}/profils-de-sante`;  // URL base du backend

  constructor(private http: HttpClient) {}

  // Headers avec le token

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Aucun token trouvé dans le localStorage !');
      throw new Error('L\'utilisateur n\'est pas authentifié');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenirTousLesProfils(): Observable<ProfilDeSante[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ProfilDeSante[]>(`${this.apiUrl}/liste`, { headers })
      .pipe(
        catchError(this.handleError)  // Gestion des erreurs
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur lors de la récupération des profils:', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }


  // Ajouter un nouveau profil de santé
  ajouterProfil(profil: ProfilDeSante): Observable<ProfilDeSante> {
    const headers = this.getAuthHeaders();  // Ajouter les headers d'authentification
    return this.http.post<ProfilDeSante>(`${this.apiUrl}/ajouter`, profil, { headers });
  }

  // Mettre à jour un profil de santé
  mettreAJourProfil(id: number | undefined, profil: ProfilDeSante): Observable<ProfilDeSante> {
    const headers = this.getAuthHeaders();  // Ajouter les headers d'authentification
    return this.http.put<ProfilDeSante>(`${this.apiUrl}/mettreAJour/${id}`, profil, { headers });
  }

  // Supprimer un profil de santé
  supprimerProfil(id: number): Observable<void> {
    const headers = this.getAuthHeaders();  // Ajouter les headers d'authentification
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers });
  }
}
