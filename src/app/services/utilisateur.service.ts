import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Utilisateur} from "../models/Utilisateur";
import {Administrateur} from "../models/Administrateur";
import {Dieteticien} from "../models/Dieteticien";
import {UtilisateurSimple} from "../models/UtilisateurSimple";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  private apiUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) { }


  creerAdministrateur(administrateur: Administrateur): Observable<Administrateur> {
    return this.http.post<Administrateur>(`${this.apiUrl}/creer/administrateur`, administrateur);
  }

  creerDieteticien(dieteticien: Dieteticien): Observable<Dieteticien> {
    return this.http.post<Dieteticien>(`${this.apiUrl}/creer/dieteticien`, dieteticien);
  }

  creerUtilisateurSimple(utilisateurSimple: UtilisateurSimple): Observable<UtilisateurSimple> {
    return this.http.post<UtilisateurSimple>(`${this.apiUrl}/creer/utilisateur`, utilisateurSimple);
  }

  modifierAdministrateur(id: number, administrateur: Administrateur): Observable<Administrateur> {
    return this.http.put<Administrateur>(`${this.apiUrl}/modifier/administrateur/${id}`, administrateur);
  }

  modifierDieteticien(id: number, dieteticien: Dieteticien): Observable<Dieteticien> {
    return this.http.put<Dieteticien>(`${this.apiUrl}/modifier/dieteticien/${id}`, dieteticien);
  }

  modifierUtilisateurSimple(id: number, utilisateurSimple: UtilisateurSimple): Observable<UtilisateurSimple> {
    return this.http.put<UtilisateurSimple>(`${this.apiUrl}/modifier/utilisateur-simple/${id}`, utilisateurSimple);
  }

  supprimerUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }

  obtenirTousLesUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);

  }



}
