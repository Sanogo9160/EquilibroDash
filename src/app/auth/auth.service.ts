import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Défini dans environment.ts

  constructor(private http: HttpClient, private router: Router) {
  }

  // Connexion utilisateur avec email et mot de passe
  login(email: string, motDePasse: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, {email, motDePasse}) // Requête vers l'API
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response); // Stocker le token JWT dans le localStorage
        })
      );
  }

  // Vérifie si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Déconnexion
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  // Récupérer le token JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Ajoute le token JWT dans les headers pour les requêtes authentifiées
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans les headers des requêtes
    });
  }
}
