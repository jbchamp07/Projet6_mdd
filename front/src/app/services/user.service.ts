import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../interfaces/User';
import { map, Observable, Subject, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import {LoginRequest } from '../dto/LoginRequest';
import { AuthResponse } from '../dto/AuthResponse';
import { UserRegister } from '../dto/UserRegister';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnDestroy {

  private apiUrl = 'http://localhost:3001/api/auth';
  private destroy$ = new Subject<void>();
  constructor(private httpClient: HttpClient, private tokenService: TokenService,private router: Router) { }

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/me`);
  }

// Méthode de login
public login(username: string, password: string): void {
  let loginRequest: LoginRequest = {username: username, password:password};
  this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest)
  .pipe(takeUntil(this.destroy$))
  .subscribe(token => {
    
    if(token.token == "Erreur d'identifiant"){
      alert("Erreur d'identifiant");
    }else{
      this.tokenService.saveToken(token.token);
      this.router.navigate(['/posts']);
    }
    
  });
}

// Méthode register
public register(user: UserRegister): void {
  this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, user)
  .pipe(takeUntil(this.destroy$))
  .subscribe(token => {
    this.tokenService.saveToken(token.token);
    this.router.navigate(['/posts']);
  });
}

// Méthode de logout
public logout(): void {
  this.tokenService.clearToken();
  this.router.navigate(['']);
}

public updateUser(user: User): Observable<string> {
  /*this.httpClient.put<string>(`${this.apiUrl}/me/update`,user).subscribe(token => {
    if(token == "Erreur lors de la modification"){
      return "Erreur lors de la modification";
    }else{
      this.tokenService.saveToken(token);
      return "Modification éffectué avec succès";
    }
  });*/
  if(user.password == ""){
    this.getUserInfo()
    .pipe(takeUntil(this.destroy$))
    .subscribe(u => {
        user.password = u.password
    });
  }

  return this.httpClient.put<string>(`${this.apiUrl}/me/update`, user).pipe(
    map(token => {
      if (token === "Erreur lors de la modification") {
        return "Erreur lors de la modification";
      } else {
        this.tokenService.saveToken(token);
        return "Modification effectuée avec succès";
      }
    })
  );
  //return this.httpClient.put<string>(`${this.apiUrl}/me/update`,user);
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete(); 
}

}
