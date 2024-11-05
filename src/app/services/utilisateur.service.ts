import { Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Utilisateur } from '../models/Utilisateur';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;
  isLoading = signal(false);

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour obtenir les en-têtes avec le jeton d'authentification si nécessaire
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Gestion centralisée des erreurs HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur HTTP:', error);
    return throwError(() => new Error('Une erreur est survenue, veuillez réessayer.'));
  }

  // Récupération de tous les utilisateurs (avec en-têtes d'authentification)
  obtenirTousLesUtilisateurs(): Observable<Utilisateur[]> {
    this.isLoading.set(true);
    return this.http
      .get<Utilisateur[]>(`${this.apiUrl}/liste`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.isLoading.set(false))
      );
  }

  // Ajouter un utilisateur en fonction de son rôle, avec ou sans authentification
  ajouterUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    const roleNom = utilisateur.role.nom;
    let endpoint = '';

    // Déterminer l'endpoint selon le rôle
    switch (roleNom) {
      case 'ADMIN':
        endpoint = '/ajouter/admin';
        break;
      case 'DIETETICIEN':
        endpoint = '/ajouter/dieteticien';
        break;
      default:
        endpoint = '/ajouter/utilisateur-simple';
        break;
    }

    console.log('Données envoyées :', utilisateur);

    // Choisir d'inclure ou non les en-têtes d'authentification
    const options = endpoint === '/ajouter/utilisateur-simple'
      ? { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      : { headers: this.getAuthHeaders() };

    return this.http
      .post<Utilisateur>(`${this.apiUrl}${endpoint}`, utilisateur, options)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la requête HTTP :', error);
          return throwError(() => new Error("Erreur lors de la création de l'utilisateur"));
        })
      );
  }

  // Méthodes existantes de mise à jour et suppression avec authentification
  mettreAJourUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http
      .put<Utilisateur>(`${this.apiUrl}/modifier/${id}`, utilisateur, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  supprimerUtilisateur(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  obtenirUtilisateurParId(id: number): Observable<Utilisateur> {
    return this.http
      .get<Utilisateur>(`${this.apiUrl}/obtenir/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
}
