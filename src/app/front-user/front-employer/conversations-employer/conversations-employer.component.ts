import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversations-employer',
  standalone: false,
  templateUrl: './conversations-employer.component.html',
  styleUrl: './conversations-employer.component.scss'
})
export class ConversationsEmployerComponent implements OnInit {
  conversationId!: number;
  messages: any[] = [];
  messageInput = '';
  loading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.conversationId = Number(this.route.snapshot.paramMap.get('id'));

    // this.fetchConversation(); // API réelle
    this.loadFakeConversation(); // FAKE
  }
  loadFakeConversation(): void {
    setTimeout(() => {
      this.messages = [
        { from: 'employeur', message: 'Bonjour, merci pour votre candidature.', date: '2025-05-01 09:00' },
        { from: 'candidat', message: 'Merci de m’avoir répondu !', date: '2025-05-01 09:10' },
        { from: 'employeur', message: 'Entretien prévu demain à 10h.', date: '2025-05-01 09:15' }
      ];
      this.loading = false;
    }, 500);
  }

  sendMessage(): void {
    if (this.messageInput.trim() === '') return;

    this.messages.push({
      from: 'employeur',
      message: this.messageInput,
      date: new Date().toISOString()
    });

    this.messageInput = '';
  }

}
