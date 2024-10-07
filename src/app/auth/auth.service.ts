import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from "../environments/environment";
import {isPlatformBrowser} from "@angular/common";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Défini dans environment.ts

  constructor(@Inject(PLATFORM_ID) private platformId: Object ,private http: HttpClient, private router: Router) {
  }

  // Connexion utilisateur avec email et mot de passe
  login(email: string, motDePasse: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, motDePasse })
      .pipe(
        tap({
          next: (response) => {
            if (response.token && isPlatformBrowser(this.platformId)) {
              localStorage.setItem('token', response.token);
            }
          },
          error: (error) => {
            console.error('Erreur lors de la connexion:', error); // Log de l'erreur
          }
        })
      );
  }

  // Vérifie si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    console.log('Token présent:', token); // Pour voir si le token est bien présent.
    return !!token; //
  }

  // Déconnexion
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Supprime le token uniquement dans le navigateur
    }
    this.router.navigate(['/auth/login']);
  }
  // Récupérer le token JWT
  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null; // Récupère le token uniquement dans le navigateur
  }

  // Ajoute le token JWT dans les headers pour les requêtes authentifiées
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans les headers des requêtes
    });
  }

}
