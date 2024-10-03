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

  //Get all topics
  public getAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.apiUrl);
  }

  //Subscribe to a topic
  public addSubToTopic(topicId: number): Observable<string>{
    return this.httpClient.post<string>(`${this.apiUrl}/subscribe`,topicId);
  }

  //Get user topics
  public getUserTopics(): Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(`${this.apiUrl}/me`);
  }

  //Unsubscribe from a topic
  public unSubscribe(topicId: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.apiUrl}/unsubscribe/${topicId}`);
  }

}
