export interface Message {
    id?: number;
    senderId: number;
    receiverId: number;
    text: string;
    date: Date;
    fileUrl?: string;
  }
  
  export interface Conversation {
    id: number;
    participant: {
      id: number;
      name: string;
      avatar?: string;
    };
    messages: Message[];
  }
  