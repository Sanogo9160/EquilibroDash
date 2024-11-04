import { Injectable } from '@angular/core';
import {Article} from "../models/article";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour lister tous les articles
  listerArticles(): Observable<Article[]> {
    const headers = this.authService.getAuthHeaders(); // Récupérer les headers d'authentification
    return this.http.get<Article[]>(`${this.apiUrl}/liste`, { headers });
  }

  // Méthode pour créer un article
  creerArticle(article: Article): Observable<Article> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Article>(`${this.apiUrl}/ajouter`, article, { headers });
  }

  // Méthode pour obtenir un article par ID
  obtenirArticle(id: number): Observable<Article> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Article>(`${this.apiUrl}/obtenir/${id}`, { headers });
  }

  // Méthode pour mettre à jour un article
  mettreAJourArticle(id: number, article: Article): Observable<Article> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Article>(`${this.apiUrl}/modifier/${id}`, article, { headers });
  }

  // Méthode pour supprimer un article
  supprimerArticle(articleId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/supprimer/${articleId}`, { headers });
  }

}
