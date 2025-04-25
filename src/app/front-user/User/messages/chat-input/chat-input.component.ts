import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  standalone:false,
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  @Output() send = new EventEmitter<string>();
  @Output() upload = new EventEmitter<File>();
  message = '';

  onSend() {
    if (this.message.trim()) {
      this.send.emit(this.message); // ✅ tu envoies la string au parent
      this.message = '';
    }
  }
  
  

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.upload.emit(input.files[0]);
    }
  }
}
