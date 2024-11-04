import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Commentaire } from "../models/Commentaire";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = `${environment.apiUrl}/commentaires`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter un commentaire.');
      throw new Error('L\'utilisateur n\'est pas authentifié');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtenir la liste des commentaires pour un forum spécifique
  listerCommentaires(forumId: number): Observable<Commentaire[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Commentaire[]>(`${this.apiUrl}/${forumId}/commentaires`, { headers })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }

  // Ajouter un commentaire pour un forum spécifique
  ajouterCommentaire(forumId: number, commentaire: Commentaire): Observable<Commentaire> {
    const headers = this.getAuthHeaders();
    return this.http.post<Commentaire>(`${this.apiUrl}/${forumId}/commentaires`, commentaire, { headers })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }

  // Mettre à jour un commentaire existant
  mettreAJourCommentaire(id: number, commentaire: Commentaire): Observable<Commentaire> {
    const headers = this.getAuthHeaders();
    return this.http.put<Commentaire>(`${this.apiUrl}/modifier/${id}`, commentaire, { headers })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }

  // Supprimer un commentaire par ID
  supprimerCommentaire(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur HTTP:', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }
}
