import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import {LoginRequest } from '../dto/LoginRequest';
import { AuthResponse } from '../dto/AuthResponse';
import { UserRegister } from '../dto/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:3001/api/auth';

  constructor(private httpClient: HttpClient, private tokenService: TokenService,private router: Router) { }

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/me`);
  }

// Méthode de login
public login(username: string, password: string): void {
  let loginRequest: LoginRequest = {username: username, password:password};
  this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest).subscribe(token => {
    this.tokenService.saveToken(token.token);
    this.router.navigate(['/posts']);
  });
}

// Méthode register
public register(user: UserRegister): void {
  this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, user).subscribe(token => {
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
  return this.httpClient.put<string>(`${this.apiUrl}/me/update`,user);
}

}
