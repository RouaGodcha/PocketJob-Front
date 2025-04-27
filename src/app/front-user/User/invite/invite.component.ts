import { Component, OnInit } from '@angular/core';
import { InviteService } from '../../_services/invite.service';

@Component({
  selector: 'app-invite',
  standalone: false,
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss'
})
export class InviteComponent implements OnInit {
  invitationLink: string = '';
  rewards: string[] = [];
  email: string = '';
  friendName: string = '';
  message: string = '';

  constructor(private inviteService: InviteService) {}

  ngOnInit(): void {
    // 🔹 Utiliser le FAKE pour tester (local sans serveur)
    this.inviteService.getInvitationInfoFake().subscribe(data => {
      this.invitationLink = data.link;
      this.rewards = data.rewards;
    });

 // 🔸 Utiliser le RÉEL (si tu veux récupérer depuis serveur)
    /*
    this.inviteService.getInvitationInfo().subscribe(data => {
      this.invitationLink = data.link;
      this.rewards = data.rewards;
    });
    */
  }

  copyLink() {
    navigator.clipboard.writeText(this.invitationLink).then(() => {
      this.message = 'Lien copié dans le presse-papier !';
    }).catch(() => {
      this.message = 'Erreur lors de la copie du lien.';
    });
  }
  
  clearMessage() {
    this.message = '';
  }

  sendInvitation() {
    if (this.friendName && this.email) {
      // 🔹 Envoi FAKE pour tester sans serveur
      this.inviteService.sendInvitationByEmailFake(this.email, this.friendName).subscribe(response => {
        this.message = response.message;
      });

      // 🔸 Envoi RÉEL vers serveur
      /*
      this.inviteService.sendInvitationByEmail(this.email, this.friendName).subscribe(response => {
        this.message = response.message;
      });
      */
    } else {
      this.message = 'Veuillez remplir tous les champs.';
    }
  }
  openFacebookShare() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.invitationLink)}`, '_blank');
  }
  
  openWhatsappShare() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(this.invitationLink)}`, '_blank');
  }
  
  openInstagramShare() {
    // Instagram ne supporte pas directement le partage web public
    // Astuce: ouvrir profil ou mettre un lien vers story
    window.open('https://www.instagram.com/', '_blank');
  }
  
  openMessengerShare() {
    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(this.invitationLink)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(this.invitationLink)}`, '_blank');
  }
  
  openTelegramShare() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(this.invitationLink)}`, '_blank');
  }
  
}
