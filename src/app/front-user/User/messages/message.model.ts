export interface Participant {
  id: number;
  type: 'employeur' | 'candidat';
  name: string;
  avatar: string;
}

export interface Message {
  id: number;
  text: string;
  sender: Participant;
  receiver: Participant;
  date: Date;
  isRead: boolean;
}

export interface Conversation {
  id: number;
  participant: Participant;
  messages: Message[];
}
