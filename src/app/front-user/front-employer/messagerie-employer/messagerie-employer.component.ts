import { Component, OnInit } from '@angular/core';
import { MessagerieEmployerService } from '../_services/messagerie-employer.service';

@Component({
  selector: 'app-messagerie-employer',
  standalone: false,
  templateUrl: './messagerie-employer.component.html',
  styleUrl: './messagerie-employer.component.scss'
})
export class MessagerieEmployerComponent implements OnInit {
  conversations: any[] = [];
  selectedMessages: any[] = [];
  selectedConversationId: number | null = null;
  messageInput: string = '';
  loading = true;

  ngOnInit(): void {
    this.loadFakeConversations();
  }

  // Liste des conversations
  loadFakeConversations(): void {
    setTimeout(() => {
      this.conversations = [
        {
          id: 1,
          from: 'Youssef Ben Ali',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
          preview: 'Bonjour, je suis intéressé...',
          date: '10:22',
          messages: [
            { from: 'candidat', message: 'Bonjour, je suis intéressé.', date: '2025-05-01 09:00' },
            { from: 'employeur', message: 'Merci de votre intérêt.', date: '2025-05-01 09:05' }
          ]
        },
        {
          id: 2,
          from: 'Nadia Trabelsi',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          preview: 'Je confirme ma présence...',
          date: '10:30',
          messages: [
            { from: 'candidat', message: 'Je confirme ma présence.', date: '2025-05-01 10:00' },
            { from: 'employeur', message: 'Merci beaucoup.', date: '2025-05-01 10:05' }
          ]
        }
      ];
      this.loading = false;
    }, 500);
  }
  openConversation(id: number): void {
    this.selectedConversationId = id;
    const convo = this.conversations.find(c => c.id === id);
    this.selectedMessages = convo ? [...convo.messages] : [];
  }


  sendMessage(): void {
    if (!this.messageInput.trim()) return;

    const newMsg = {
      from: 'employeur',
      message: this.messageInput,
      date: new Date().toISOString()
    };

    this.selectedMessages.push(newMsg);
    this.messageInput = '';
  }

  getSelectedContact() {
    return this.conversations.find(c => c.id === this.selectedConversationId);
  }
}