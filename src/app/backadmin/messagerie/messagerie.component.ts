import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messagerie',
  standalone : false ,
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {
  searchTerm: string = '';

  contactTypes = [
    { label: 'Tous', value: null },
    { label: 'Employeur', value: 'employeur' },
    { label: 'Candidat', value: 'candidat' }
  ];

  messageStatusOptions = [
    { label: 'Tous', value: null },
    { label: 'Lus', value: true },
    { label: 'Non lus', value: false }
  ];

  selectedContactType: string | null = null;
  selectedMessageStatus: boolean | null = null;

  contacts = [
    { id: 1, nom: 'Mohamed ', type: 'employeur' },
    { id: 2, nom: 'Bob', type: 'candidat' },
    { id: 3, nom: 'Roua', type: 'candidat' }
  ];

  conversations = [
    {
      id: 201,
      nom: 'Sarah Amari',
      lu: false,
      date: new Date(),
      dernierMessage: 'Merci pour votre offre, j’ai quelques questions avant de confirmer.',
      messages: [
        {
          from: 'Sarah',
          contenu: 'Bonjour, j’ai bien reçu votre offre pour le poste de développeuse front-end.',
          date: new Date('2024-04-17T09:00:00')
        },
        {
          from: 'admin',
          contenu: 'Bonjour Sarah, nous serions ravis de vous compter parmi nous. Avez-vous des questions ?',
          date: new Date('2024-04-17T09:05:00')
        },
        {
          from: 'Sarah',
          contenu: 'Oui, je voulais savoir si le poste permet le télétravail partiel ?',
          date: new Date('2024-04-17T09:10:00')
        },
        {
          from: 'admin',
          contenu: 'Absolument ! 2 jours de télétravail par semaine sont prévus.',
          date: new Date('2024-04-17T09:12:00')
        },
        {
          from: 'Sarah',
          contenu: 'Parfait, dans ce cas j’accepte l’offre. Merci !',
          date: new Date('2024-04-17T09:20:00')
        },
        {
          from: 'admin',
          contenu: 'Félicitations Sarah ! On vous envoie les documents dès aujourd’hui.',
          date: new Date('2024-04-17T09:22:00')
        }
      ]
    }
  ];
  

  filteredContacts: any[] = [];
  filteredConversations: any[] = [];

  selectedContact: any = null;
  selectedConversation: any = null;

  ngOnInit(): void {
    this.filterContacts();
    this.filterMessages();
  }

  filterContacts() {
    this.filteredContacts = this.selectedContactType
      ? this.contacts.filter(c => c.type === this.selectedContactType)
      : [...this.contacts];
  }

  filterMessages() {
    this.filteredConversations = this.selectedMessageStatus !== null
      ? this.conversations.filter(c => c.lu === this.selectedMessageStatus)
      : [...this.conversations];
  }

  searchMessages() {
    const term = this.searchTerm.toLowerCase();
    this.filteredConversations = this.conversations.filter(c =>
      c.nom.toLowerCase().includes(term) ||
      c.dernierMessage.toLowerCase().includes(term)
    );
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
    this.selectedConversation = this.conversations.find(c => c.nom === contact.nom);
  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    conversation.lu = true;
  }
}
