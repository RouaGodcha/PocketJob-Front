// messages.component.ts
import { Component, OnInit } from '@angular/core';
import { Message, Conversation, Participant } from './message.model';
import { MessagerieService } from '../../_services/messagerie.service';

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
  currentUser: Participant = {
    id: 1,
    type: 'candidat',
    name: 'Moi (Candidat)',
    avatar: '/image/avatar_canadidat.jpg'
  };
  constructor(private messagerieService: MessagerieService) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations() {
    this.messagerieService.getConversations().subscribe(convs => {
      this.conversations = convs;
      this.loading = false;
    });
  }

  onSelectConversation(conversation: Conversation) {
    this.activeConversation = conversation;
    this.messages = conversation.messages;
  }
  onSendMessage(text: string) {
    if (!text.trim() || !this.activeConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: this.currentUser,
      receiver: this.activeConversation.participant,
      date: new Date(),
      isRead: false
    };

    this.messagerieService.sendMessage(this.activeConversation.id, newMessage).subscribe(msg => {
      this.messages.push(msg);
    });
  }

  onUploadFile(file: File) {
    console.log('Upload file:', file);
    // À implémenter plus tard pour upload fichier
  }

  isMe(msg: Message): boolean {
    return msg.sender.id === 1; // Remplacer 1 par l'ID du current user
  }
  
}
