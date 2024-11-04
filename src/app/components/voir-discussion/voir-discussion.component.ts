import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentaireService } from '../../services/commentaire.service';
import { Commentaire } from '../../models/Commentaire';
import {CommonModule, DatePipe, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-voir-discussion',
  standalone: true,
  imports: [FormsModule,CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, DatePipe, SlicePipe],
  templateUrl: './voir-discussion.component.html',
  styleUrls: ['./voir-discussion.component.css']
})
export class VoirDiscussionComponent implements OnInit {

  @Input() forum: any; // Forum sélectionné passé en entrée
  commentaires: Commentaire[] = [];
  expandedComments: boolean[] = [];
  newCommentContent: string = '';
  showCommentForm: boolean = false; // État pour afficher ou masquer le formulaire

  constructor(private commentaireService: CommentaireService) {}

  ngOnInit(): void {
    if (this.forum) {
      this.loadComments();
    }
  }

  // Méthode pour basculer l'affichage du formulaire d'ajout de commentaire
  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
    if (!this.showCommentForm) {
      this.newCommentContent = ''; // Réinitialiser le contenu du commentaire si le formulaire est masqué
    }
  }

  // Charge les commentaires associés au forum
  loadComments(): void {
    if (this.forum.id) {
      this.commentaireService.listerCommentaires(this.forum.id).subscribe({
        next: (data) => {
          this.commentaires = data;
          this.expandedComments = Array(data.length).fill(false);
        },
        error: (err) => console.error('Erreur lors du chargement des commentaires:', err)
      });
    }
  }

  // Ajoute un commentaire au forum
  addComment(): void {
    if (this.newCommentContent && this.forum.id) {
      const newComment: Commentaire = {
        contenu: this.newCommentContent,
        dateCreation: new Date().toISOString(),
        forumId: this.forum.id
      };
      this.commentaireService.ajouterCommentaire(this.forum.id, newComment).subscribe({
        next: (addedComment) => {
          this.commentaires.push(addedComment);
          this.newCommentContent = '';
          this.toggleCommentForm();
        },
        error: (err) => console.error('Erreur lors de l\'ajout du commentaire:', err)
      });
    }
  }

  // Permet d'afficher le contenu complet d'un commentaire
  expandComment(index: number): void {
    this.expandedComments[index] = true;
  }

  // Modifie un commentaire existant
  editComment(commentaire: Commentaire): void {
    // Implémenter la logique de modification selon votre interface utilisateur
  }

  // Demande de confirmation avant suppression d'un commentaire
  confirmDeleteComment(commentaire: Commentaire): void {
    const confirmation = window.confirm('Voulez-vous vraiment supprimer ce commentaire ?');
    if (confirmation && commentaire.id) {
      this.deleteComment(commentaire);
    }
  }

  // Supprime un commentaire
  deleteComment(commentaire: Commentaire): void {
    if (commentaire.id) {
      this.commentaireService.supprimerCommentaire(commentaire.id).subscribe({
        next: () => {
          this.commentaires = this.commentaires.filter(c => c.id !== commentaire.id);
        },
        error: (err) => console.error('Erreur lors de la suppression du commentaire:', err)
      });
    }
  }

}
