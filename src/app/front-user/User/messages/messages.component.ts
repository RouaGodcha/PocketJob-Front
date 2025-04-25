// messages.component.ts
import { Component, OnInit } from '@angular/core';
import { Message, Conversation } from './message.model';

@Component({
  selector: 'app-messages',
  standalone:false,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  loading = true;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  activeConversation: Conversation | null = null;

  ngOnInit(): void {
    this.loading = true;
  
    // 🔹 Simule une réponse API avec fake data
    setTimeout(() => {
      this.conversations = [
        {
          id: 1,
          participant: { id: 2, name: 'Entreprise A', avatar: 'assets/avatar1.jpg' },
          messages: [
            { text: 'Bonjour, vous êtes dispo demain ?', senderId: 2, receiverId: 1, date: new Date() }
          ]
        },
        {
          id: 2,
          participant: { id: 3, name: 'Entreprise B', avatar: 'assets/avatar2.jpg' },
          messages: [
            { text: 'Merci pour votre réponse.', senderId: 3, receiverId: 1, date: new Date() }
          ]
        }
      ];
      this.loading = false;
    }, 1000); // délai simulé
  }
  
  onSelectConversation(conversation: Conversation) {
    this.activeConversation = conversation;
    this.messages = conversation.messages;
    console.log('Conversation sélectionnée :', conversation);

  }

  onSendMessage(msg: string) {
    if (!msg || !this.activeConversation) return;

    const newMsg: Message = {
      text: msg,
      senderId: 1,
      receiverId: this.activeConversation.participant.id,
      date: new Date()
    };

    this.messages.push(newMsg);
    this.activeConversation.messages.push(newMsg);

    // TODO: appel API pour enregistrer le message
    console.log('Message envoyé :', newMsg);

  }

  onUploadFile(file: File) {
    console.log('Fichier envoyé :', file);
    // TODO: API upload de fichier
  }
}
