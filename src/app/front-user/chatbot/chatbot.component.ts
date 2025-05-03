import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../_services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  
  standalone: false,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {
  userInput = '';
  messages: { sender: 'user' | 'bot', text: string, buttons?: string[] }[] = [];
  visible = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {}

  toggleChatbot() {
    this.visible = !this.visible;
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;
  
    const messageText = this.userInput.trim();
    this.messages.push({ sender: 'user', text: messageText });
  
    this.chatbotService.sendMessage(messageText).subscribe({
      next: (response) => {
        this.messages.push({ sender: 'bot', text: response.reply });
      },
      error: (error) => {
        const errorMsg = error?.error?.reply || 'Erreur lors de la réponse.';
        this.messages.push({ sender: 'bot', text: errorMsg });
      }
      
    });
  
    this.userInput = '';
  }

  
  
}
