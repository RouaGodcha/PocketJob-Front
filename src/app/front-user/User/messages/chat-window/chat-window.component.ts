import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-chat-window',
  standalone: false,
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() messages: Message[] = [];
  

  // ⚡️ Si tu veux appliquer les classes 'me' sur les messages envoyés par toi :
  isMe(msg: Message): boolean {
    return msg.sender.id === 1; // 1 = current user ID, adapte si besoin
  }
}
