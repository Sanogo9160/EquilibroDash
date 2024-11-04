import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from "../environments/environment";
import {isPlatformBrowser} from "@angular/common";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Défini dans environment.ts


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router) {}

  login(email: string, motDePasse: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, motDePasse })
      .pipe(
        tap(response => {
          if (response.token && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur lors de la connexion:', error);
    return throwError('Erreur de connexion, veuillez réessayer.');
  }

  isAuthenticated(): boolean {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    return !!token;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // La méthode pour obtenir l'utilisateur actuel
  obtenirUtilisateurActuel(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/utilisateurs/current`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
}
