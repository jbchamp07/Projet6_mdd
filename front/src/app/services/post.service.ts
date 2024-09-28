import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Post';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 
  private apiUrl = 'http://localhost:3001/api/posts';

  constructor(private httpClient: HttpClient) {

  }

  public getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl);
  }

  public createPost(post: Post): Observable<string>{
    return this.httpClient.post<string>(this.apiUrl,post);
  }
  public GetPostById(id: number): Observable<Post>{
    return this.httpClient.get<Post>(`${this.apiUrl}/${id}`);
  }

}
