import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = `${environment.apiUrl}/utilisateurs/stats`;

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  // Récupérer les statistiques des utilisateurs
  obtenirStatistiques(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }


}
