import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenService } from "../services/token.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private tokenService: TokenService, private router: Router) {}
  
    canActivate(): boolean {
      const token = this.tokenService.getToken();
  
      if (token) {
        // Si le token est présent, permettre l'accès à la route
        return true;
      } else {
        // Sinon, rediriger vers la page de connexion
        this.router.navigate(['']);
        return false;
      }
    }
  }