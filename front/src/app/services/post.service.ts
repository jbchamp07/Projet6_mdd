import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Post';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Comment } from '../interfaces/Comment';
import { NewComment } from '../dto/NewComment';

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
  public addComment(postId: number,comment: NewComment): Observable<string>{
    return this.httpClient.post<string>(`${this.apiUrl}/${postId}`,comment);
  }
  public getComments(postId: number): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

}
