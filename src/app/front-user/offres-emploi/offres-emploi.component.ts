import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offres-emploi',
  standalone:false,
  templateUrl: './offres-emploi.component.html',
  styleUrls: ['./offres-emploi.component.scss']
})
export class OffresEmploiComponent implements OnInit {
  search = {
    title: '',
    location: '',
    type: '',
    company: '',
    seniority: ''
  };

  offres: any[] = [];
  filtered = [...this.offres];
  selectedOffre: any = null;
  fakeOffres = [
    {
      id: 1,
      title: 'Serveur polyvalent',
      company: 'Brasserie du Parc',
      location: 'Tunis',
      type: 'Temps partiel',
      seniority: 'Débutant',
      startDate: '2025-05-01',
      duration: '3 mois',
      description: 'Service en salle, prise de commande...',
      entreprise: {
        nom: 'Brasserie du Parc',
        responsable: { nom: 'Ahmed Ben Salah' }
      }
    },
    {
      id: 2,
      title: 'Préparateur de commandes',
      company: 'Amazon Logistics',
      location: 'Sfax',
      type: 'Temps plein',
      seniority: 'Intermédiaire',
      startDate: '2025-06-15',
      duration: '6 mois',
      description: 'Préparation de colis...',
      entreprise: {
        nom: 'Amazon Logistics',
        responsable: { nom: 'Nour Ben Miled' }
      }
    },
    {
      id: 3,
      title: 'Aide-soignant',
      company: 'Clinique Santé Plus',
      location: 'Ariana',
      type: 'Intérim',
      seniority: 'Expérimenté',
      startDate: '2025-04-27',
      duration: '1 mois',
      description: 'Assistance aux patients...',
      entreprise: {
        nom: 'Clinique Santé Plus',
        responsable: { nom: 'Dr Karim Jlassi' }
      }
    },
    {
      id: 1,
      title: 'Développeur Web',
      company: 'TechCorp',
      location: 'Tunis',
      type: 'Temps plein',
      seniority: 'Intermédiaire',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43960.85817615571!2d10.691105868038033!3d35.74750473767396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13020cc09c631e5d%3A0x94b845be8275085e!2sHilton%20Skanes%20Monastir%20Beach%20Resort!5e0!3m2!1sfr!2stn!4v1745859518875!5m2!1sfr!2stn'
    },
    {
      id: 2,
      title: 'Designer UI/UX',
      company: 'Creatives',
      location: 'Sousse',
      type: 'Freelance',
      seniority: 'Débutant',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44324.262109770165!2d10.633056!3d35.825556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13020dcd833d7c4b%3A0xbfcf7bce4e1f2f7b!2sSousse!5e0!3m2!1sfr!2stn!4v1745860000000!5m2!1sfr!2stn'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.offres = this.fakeOffres;
    this.filtered = [...this.fakeOffres];
  }

  applyFilters(): void {
    this.filtered = this.offres.filter(offre =>
      (!this.search.title || offre.title.toLowerCase().includes(this.search.title.toLowerCase())) &&
      (!this.search.location || offre.location.toLowerCase().includes(this.search.location.toLowerCase())) &&
      (!this.search.type || offre.type === this.search.type) &&
      (!this.search.company || offre.company.toLowerCase().includes(this.search.company.toLowerCase())) &&
      (!this.search.seniority || offre.seniority === this.search.seniority)
    );
  }

  viewDetails(id: number): void {
    this.router.navigate(['/home/offres/details-offre', id]);
  }
  

  closeDetails() {
    this.selectedOffre = null;
  }
  
}
