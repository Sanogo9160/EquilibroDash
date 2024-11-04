import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article";
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vertus-aliments',
  standalone: true,
  imports: [],
  templateUrl: './vertus-aliments.component.html',
  styleUrl: './vertus-aliments.component.css'
})
export class VertusAlimentsComponent implements OnInit {
  articles: Article[] = [];
  loading = false;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.loading = true;
    this.articleService.listerArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.loading = false;
      }
    });
  }

  addArticle(): void {
    // Navigate to the add article form (you need to implement the route)
    this.router.navigate(['/ajouter-article']);
  }
}

