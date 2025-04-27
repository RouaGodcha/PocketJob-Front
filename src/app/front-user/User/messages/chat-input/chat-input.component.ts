import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  standalone: false,
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @Output() send = new EventEmitter<string>();
  @Output() upload = new EventEmitter<File>();
  message = '';
  isSending = false;  // Flag to prevent multiple sends

  onSend(event: Event) {
    if (this.message.trim() && !this.isSending) {
      this.isSending = true;  // Empêche l'envoi multiple
      this.send.emit(this.message);
      this.message = '';
      setTimeout(() => this.isSending = false, 500);  // Reset flag after 500ms to allow next message
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.upload.emit(input.files[0]);
    }
  }
}
