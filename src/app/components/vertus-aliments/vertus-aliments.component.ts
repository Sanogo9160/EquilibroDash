// src/app/components/vertus-aliments/vertus-aliments.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SafeUrlPipe } from '../../safe-url.pipe';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-vertus-aliments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SafeUrlPipe,
    MatIconModule
  ],
  templateUrl: './vertus-aliments.component.html',
  styleUrls: ['./vertus-aliments.component.css']
})
export class VertusAlimentsComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  formVisible = false; // Contrôle l'affichage du formulaire
  articleForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private formBuilder: FormBuilder
  ) {
    // Initialisation du formulaire réactif
    this.articleForm = this.formBuilder.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      videoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.recupererTousLesArticles();
  }

  recupererTousLesArticles(): void {
    this.loading = true;
    this.articleService.listerArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des articles:', err);
        this.loading = false;
      }
    });
  }

  // Afficher ou cacher le formulaire
  ajouterArticle(): void {
    this.formVisible = !this.formVisible; // Bascule l'affichage du formulaire
  }

  // Soumettre le formulaire
  soumettreArticle(): void {
    if (this.articleForm.valid) {
      const nouvelArticle: Article = this.articleForm.value;
      this.articleService.creerArticle(nouvelArticle).subscribe({
        next: (article) => {
          this.articles.push(article); // Ajout l'article à la liste
          this.articleForm.reset(); // Réinitialise  le formulaire
          this.formVisible = false; // Masquer le formulaire
        },
        error: (err) => console.error('Erreur lors de la création de l\'article:', err)
      });
    }
  }

  annulerAjout(): void {
    this.formVisible = false;
    this.articleForm.reset(); // Réinitialise le formulaire si nécessaire
  }


  modifierArticle(id: number) {
    this.articleService.obtenirArticle(id).subscribe(
      (article) => {
        this.articleForm.patchValue(article);
        this.formVisible = true; // Affiche le formulaire avec les détails de l'article à modifier
      },
      (error) => {
        console.error('Erreur lors de l\'obtention de l\'article', error);
      }
    );
  }

  supprimerArticle(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.supprimerArticle(id).subscribe(
        () => {
          this.articles = this.articles.filter(article => article.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'article', error);
        }
      );
    }
  }

}
