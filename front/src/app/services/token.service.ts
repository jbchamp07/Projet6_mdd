import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'token';

  private loggedIn = new BehaviorSubject<boolean>(false); // Valeur par défaut
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() { }

  // Sauvegarder le token dans le localStorage
  public saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY,token);
    this.loggedIn.next(true);
  }

  // Récupérer le token
  public getToken(): string | null {
    if(sessionStorage.getItem(this.TOKEN_KEY) != null){
      this.loggedIn.next(true);
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Supprimer le token (déconnexion)
  public clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY)
    this.loggedIn.next(false);
  }


}