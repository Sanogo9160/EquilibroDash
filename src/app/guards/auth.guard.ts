import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      return true; // L'utilisateur est autorisé à accéder à la route
    } else {
      // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
      this.router.navigate(['/auth/login']);
      return false; // L'utilisateur n'est pas autorisé à accéder à la route
    }
  }
}
