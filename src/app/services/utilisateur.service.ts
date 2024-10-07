import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Utilisateur} from "../models/Utilisateur";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient, private authService: AuthService,) { }


  // Méthode générique pour créer un utilisateur selon son rôle
  creerUtilisateur<T extends Utilisateur>(utilisateur: T): Observable<T> {
    let url = `${this.apiUrl}/creer`;
    return this.http.post<T>(url, utilisateur);
  }


  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Suppression d'un utilisateur par son ID
  supprimerUtilisateur(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers });
  }

// Récupération de tous les utilisateurs
  obtenirTousLesUtilisateurs(): Observable<Utilisateur[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Utilisateur[]>(this.apiUrl + '/liste', { headers });
  }


}
