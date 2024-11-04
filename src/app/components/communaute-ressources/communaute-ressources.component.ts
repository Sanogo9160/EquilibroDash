import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Forum } from "../../models/Forum";
import { ForumService } from "../../services/forum.service";
import { CommentaireService } from "../../services/commentaire.service";
import {VoirDiscussionComponent} from "../voir-discussion/voir-discussion.component";


@Component({
  selector: 'app-communaute-ressources',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    VoirDiscussionComponent
  ],
  providers: [DatePipe],
  templateUrl: './communaute-ressources.component.html',
  styleUrls: ['./communaute-ressources.component.css']
})
export class CommunauteRessourcesComponent implements OnInit {
  afficherListe = true;
  forums: Forum[] = [];
  nouveauForum: Forum = { nom: '', description: '', dateCreation: '' };
  selectedForum: Forum | null = null;

  private datePipe = inject(DatePipe);

  constructor(
    private forumService: ForumService,
    private commentaireService: CommentaireService
  ) {}

  ngOnInit(): void {
    this.obtenirForums();
  }

  obtenirForums(): void {
    this.forumService.listerForums().subscribe({
      next: (data) => this.forums = data,
      error: (err) => console.error('Erreur lors du chargement des forums:', err)
    });
  }

  ajouterForum(): void {
    if (this.nouveauForum.nom && this.nouveauForum.description) {
      this.nouveauForum.dateCreation = new Date().toISOString();
      this.forumService.creerForum(this.nouveauForum).subscribe({
        next: (forum) => {
          this.forums.push(forum);
          this.nouveauForum = { nom: '', description: '', dateCreation: '' };
          this.afficherListe = true;
        },
        error: (err) => {
          console.error('Erreur lors de la création du forum:', err);
          alert('Erreur lors de la création du forum. Veuillez réessayer.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  toggleFormVisible(): void {
    this.afficherListe = !this.afficherListe;
  }

  afficherCommentaires(forum: Forum): void {
    this.selectedForum = forum;
    this.afficherListe = false;
  }

  retourListe(): void {
    this.selectedForum = null;
    this.afficherListe = true;
  }

  modifierForum(forum: Forum): void {
    // Logique de modification
  }

  confirmerSuppressionForum(forum: Forum): void {
    const confirmation = window.confirm('Voulez-vous vraiment supprimer ce forum ?');
    if (confirmation && forum.id !== undefined) {
      this.supprimerForum(forum);
    }
  }

  supprimerForum(forum: Forum): void {
    if (forum.id !== undefined) {
      this.forumService.supprimerForum(forum.id).subscribe({
        next: () => {
          this.forums = this.forums.filter(f => f.id !== forum.id);
        },
        error: (err) => console.error('Erreur lors de la suppression du forum:', err)
      });
    } else {
      console.error('L\'ID du forum à supprimer est undefined');
    }
  }
}
