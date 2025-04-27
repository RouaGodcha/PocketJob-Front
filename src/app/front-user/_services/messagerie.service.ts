import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Message, Conversation, Participant } from '../User/messages/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  

  private apiUrl = `${environment.apiUrl}/messages`;
  private fakeMode = true; // ⬅️ toggle facile ici pour fake ou API

  private fakeUser: Participant = {
    id: 1,
    type: 'candidat',
    name: 'Moi (Candidat)',
    avatar: 'assets/candidat.jpg'
  };

  private fakeConversations: Conversation[] = [
    {
      id: 1,
      participant: { id: 2, type: 'employeur', name: 'Entreprise A', avatar: 'assets/entrepriseA.jpg' },
      messages: [
        { id: 1, text: 'Bonjour, êtes-vous dispo demain ?', sender: { id: 2, type: 'employeur', name: 'Entreprise A', avatar: 'assets/entrepriseA.jpg' }, receiver: { id: 1, type: 'candidat', name: 'Moi (Candidat)', avatar: 'assets/candidat.jpg' }, date: new Date(), isRead: false }
      ]
    },
    {
      id: 2,
      participant: { id: 3, type: 'employeur', name: 'Entreprise B', avatar: 'assets/entrepriseB.jpg' },
      messages: [
        { id: 2, text: 'Merci pour votre postulation.', sender: { id: 3, type: 'employeur', name: 'Entreprise B', avatar: 'assets/entrepriseB.jpg' }, receiver: { id: 1, type: 'candidat', name: 'Moi (Candidat)', avatar: 'assets/candidat.jpg' }, date: new Date(), isRead: true }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    if (this.fakeMode) {
      return of(this.fakeConversations).pipe(delay(1000));
    } else {
      return this.http.get<Conversation[]>(`${this.apiUrl}`);
    }
  }

  sendMessage(conversationId: number, message: Message): Observable<Message> {
    if (this.fakeMode) {
      const conversation = this.fakeConversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      }
      return of(message).pipe(delay(500));
    } else {
      return this.http.post<Message>(`${this.apiUrl}/send`, message);
    }
  }
}