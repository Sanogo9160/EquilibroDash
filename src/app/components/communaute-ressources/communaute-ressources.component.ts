// communaute-ressources.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Forum } from "../../models/Forum";
import { Commentaire } from "../../models/Commentaire";
import { ForumService } from "../../services/forum.service";
import { CommentaireService } from "../../services/commentaire.service";

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
    MatInputModule
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
  commentaires: Commentaire[] = [];
  nouveauCommentaire: string = '';

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
      // Format de date ISO avec le suffixe 'Z' pour correspondre à OffsetDateTime du backend
      this.nouveauForum.dateCreation = new Date().toISOString();

      this.forumService.creerForum(this.nouveauForum).subscribe({
        next: (forum) => {
          this.forums.push(forum);
          this.nouveauForum = { nom: '', description: '', dateCreation: '' }; // Réinitialiser le formulaire
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
    if (forum.id !== undefined) {
      this.commentaireService.listerCommentaires(forum.id).subscribe({
        next: (data) => this.commentaires = data,
        error: (err) => console.error('Erreur lors du chargement des commentaires:', err)
      });
    } else {
      console.error('L\'ID du forum est undefined');
    }
  }

  ajouterCommentaire(): void {
    if (this.nouveauCommentaire && this.selectedForum && this.selectedForum.id !== undefined) {
      const commentaire: Commentaire = {
        contenu: this.nouveauCommentaire,
        dateCreation: this.datePipe.transform(new Date(), 'yyyy-MM-dd') || ''
      };
      this.commentaireService.ajouterCommentaire(this.selectedForum.id, commentaire).subscribe({
        next: (commentaireAjoute) => {
          this.commentaires.push(commentaireAjoute);
          this.nouveauCommentaire = '';
        },
        error: (err) => console.error('Erreur lors de l\'ajout du commentaire:', err)
      });
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

  modifierForum(forum: Forum): void {
    // Logic for modifying forum
  }
}
