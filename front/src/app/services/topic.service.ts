import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/Topic';

@Injectable({
  providedIn: 'root'
})
export class TopicServiceService {

  private apiUrl = 'http://localhost:3001/api/topics';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.apiUrl);
  }

  public addSubToTopic(topicId: number): Observable<string>{
    return this.httpClient.post<string>(`${this.apiUrl}/subscribe`,topicId);
  }

  public getUserTopics(): Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(`${this.apiUrl}/me`);
  }

}
