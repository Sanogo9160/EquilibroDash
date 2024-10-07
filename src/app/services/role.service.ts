import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "../models/Role";
import {AuthService} from "../auth/auth.service";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour lister tous les rôles
  listerRoles(): Observable<Role[]> {
    const headers = this.authService.getAuthHeaders(); // Récupérer les headers d'authentification
    return this.http.get<Role[]>(`${this.apiUrl}/liste`, { headers });
  }

  // Méthode pour créer un rôle
  creerRole(role: Role): Observable<Role> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Role>(`${this.apiUrl}/creer`, role, { headers });
  }

  // Méthode pour obtenir un rôle par ID
  obtenirRole(id: number): Observable<Role> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Role>(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour mettre à jour un rôle
  mettreAJourRole(id: number, role: Role): Observable<Role> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Role>(`${this.apiUrl}/modifier/${id}`, role, { headers });
  }

  // Méthode pour supprimer un rôle
  supprimerRole(roleId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/supprimer/${roleId}`, { headers });
  }

}
