import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../environments/environment";
import {Forum} from "../models/Forum";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl = `${environment.apiUrl}/forums`;  // URL de base du backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter un forum.');
      throw new Error('L\'utilisateur n\'est pas authentifié');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtenir la liste des forums
  listerForums(): Observable<Forum[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Forum[]>(`${this.apiUrl}/obtenir`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Ajouter un nouveau forum
  creerForum(forum: Forum): Observable<Forum> {
    const headers = this.getAuthHeaders();
    return this.http.post<Forum>(`${this.apiUrl}/creer`, forum, { headers })
      .pipe(catchError(this.handleError));
  }


  // Modifier un forum existant
  modifierForum(forum: Forum): Observable<Forum> {
    const headers = this.getAuthHeaders();
    return this.http.put<Forum>(`${this.apiUrl}/modifier/${forum.id}`, forum, { headers })
      .pipe(catchError(this.handleError));
  }

  // Supprimer un forum
  supprimerForum(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour obtenir un forum par son ID
  obtenirForum(id: number): Observable<Forum> {
    const headers = this.getAuthHeaders();
    return this.http.get<Forum>(`${this.apiUrl}/obtenir/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Autres méthodes CRUD...

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur lors de la récupération des forums:', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }



}
