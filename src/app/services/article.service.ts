import { Injectable } from '@angular/core';
import {Article} from "../models/article";
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour effectuer cette action.');
      throw new Error('Utilisateur non authentifié');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Liste tous les articles
  listerArticles(): Observable<Article[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Article[]>(`${this.apiUrl}/liste`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Crée un nouvel article
  creerArticle(article: Article): Observable<Article> {
    const headers = this.getAuthHeaders();
    return this.http.post<Article>(`${this.apiUrl}/ajouter`, article, { headers })
      .pipe(catchError(this.handleError));
  }

  // Modifie un article existant
  modifierArticle(id: number, article: Article): Observable<Article> {
    const headers = this.getAuthHeaders();
    return this.http.put<Article>(`${this.apiUrl}/modifier/${id}`, article, { headers })
      .pipe(catchError(this.handleError));
  }

  // Supprime un article
  supprimerArticle(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Obtient un article par son ID
  obtenirArticle(id: number): Observable<Article> {
    const headers = this.getAuthHeaders();
    return this.http.get<Article>(`${this.apiUrl}/obtenir/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour obtenir l'utilisateur courant
  obtenirUtilisateurActuel(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/utilisateurs/current`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Gère les erreurs HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur lors de la requête:', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }

}

