import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {Commentaire} from "../models/Commentaire";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = `${environment.apiUrl}/forums`;

  constructor(private http: HttpClient) {}

  listerCommentaires(forumId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/${forumId}/commentaires`);
  }

  ajouterCommentaire(forumId: number, commentaire: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.apiUrl}/${forumId}/commentaires`, commentaire);
  }
}
