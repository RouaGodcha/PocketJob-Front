import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Conversation } from '../User/messages/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getConversations(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/messages/${userId}`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages/send`, message);
  }
}
