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
  filtered: any[] = [];

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
    console.log('ID cliqué :', id);
    this.router.navigate(['home/offres/details-offre', id]); // ✅ CHEMIN COMPLET
  }
  
}
