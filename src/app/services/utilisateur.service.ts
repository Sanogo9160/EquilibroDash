import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../models/Utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  private apiUrl = 'http://localhost:8080/api/utilisateurs';  // Your backend API endpoint

  constructor(private http: HttpClient) { }

  // Fetch all users
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/liste`);
  }

  // Delete a user by ID
  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }

  // Approve a user (assuming it's a POST request to approve a user)
  approuverUtilisateur(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/approuver/${id}`, {});  // Send approval request
  }

}
