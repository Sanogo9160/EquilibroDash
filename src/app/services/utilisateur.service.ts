import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Utilisateur} from "../models/Utilisateur";

import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient, private authService: AuthService,) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur HTTP:', error);
    return throwError('Une erreur est survenue, veuillez réessayer.');
  }

  // Récupération de tous les utilisateurs
  obtenirTousLesUtilisateurs(): Observable<Utilisateur[]> {
    return this.http
      .get<Utilisateur[]>(`${this.apiUrl}/liste`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer un utilisateur par ID
  obtenirUtilisateurParId(id: number): Observable<Utilisateur> {
    return this.http
      .get<Utilisateur>(`${this.apiUrl}/obtenir/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Ajouter un utilisateur en fonction de son rôle
  ajouterUtilisateur(utilisateur: Utilisateur, roleNom: string): Observable<Utilisateur> {
    let endpoint = '';

    // Définir l'endpoint en fonction du rôle
    if (roleNom === 'ADMIN') {
      endpoint = '/ajouter/admin';
    } else if (roleNom === 'DIETETICIEN') {
      endpoint = '/ajouter/dieteticien';
    } else {
      endpoint = '/ajouter/utilisateur-simple';
    }

    return this.http.post<Utilisateur>(`${this.apiUrl}${endpoint}`, utilisateur, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un utilisateur
  mettreAJourUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/modifier/${id}`, utilisateur, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer un utilisateur
  supprimerUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

}
