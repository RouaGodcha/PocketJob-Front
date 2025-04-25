import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation } from '../message.model';

@Component({
  selector: 'app-conversation-list',
  standalone:false,
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  @Input() conversations: Conversation[] = [];
  @Output() select = new EventEmitter<Conversation>();

  onSelect(conversation: Conversation) {
    this.select.emit(conversation);
  }
}
