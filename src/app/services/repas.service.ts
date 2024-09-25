import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RepasService {

  private apiUrl = `${environment.apiUrl}/repas`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getRepasUtilisateur(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/utilisateur/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  ajouterRepas(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouter`, data, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
