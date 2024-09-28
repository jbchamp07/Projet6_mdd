import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = '798d97bad82ae937ef5af3529b7c2843f70473d40e068145631f7bd838044b55';

  constructor() { }

  // Sauvegarder le token dans le localStorage
  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Récupérer le token
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Supprimer le token (déconnexion)
  public clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Indique si l'utilisateur est connecté
  public Islogged(): boolean {
    if(this.getToken()){
      return true;
    }else{
      return false;
    }
  }

}
