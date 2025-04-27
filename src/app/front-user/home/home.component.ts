import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Offer {
  id: number; // 👈 Ajouté
  title: string;
  company: string;
  location: string;
  type: string;
  startDate?: string;
  seniority?: string;
}


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  searchKeyword = '';
  searchRegion = '';
  showFilters = false;

  filteredOffers: Offer[] = [];

  fakeOffers: Offer[] = [
    { id: 1,title: 'Serveur en restauration', company: 'Brasserie du Parc', location: 'Lyon', type: 'Temps partiel' },
    { id: 2,title: 'Préparateur de commande', company: 'Amazon', location: 'Lille', type: 'Temps plein' },
    { id: 3,title: 'Aide-soignant', company: 'Clinique Santé Plus', location: 'Paris', type: 'Intérim' },
    { id: 4,title: 'Vendeur en boutique', company: 'Zara', location: 'Marseille', type: 'CDD' },
  ];

  fakePartners = [
    { name: 'Aziza', logo: '/image/partners/amazon.png' },
    { name: 'HM', logo: '/image/partners/zara.png' },
    { name: 'Carrefour', logo: '/image/partners/carrefour.png' },
    { name: 'SNCF', logo: '/image/partners/sncf.png' },
  ];

  fakeMissions = [
    { label: 'Serveur', icon: '/image/fakeOffers/travaille11.jpg' },
    { label: 'Hôte(sse) d’accueil événementiel', icon: '/image/fakeOffers/travaille.jpg' },
    { label: 'Vente', icon: '/image/fakeOffers/travaille44.jpg '},
    { label: 'caissier', icon: '/image/fakeOffers/travaille5.jpg' },
    { label: 'Garde d’enfants', icon: '/image/fakeOffers/travaille3.jpg '},
    // Nouveaux exemples :
  { label: 'Manutentionnaire', icon: '/image/fakeOffers/travaille6.jpg' },
  { label: 'Personnel de service', icon: '/image/fakeOffers/travaile6.jpg' },
  { label: 'Livreur', icon: '/image/fakeOffers/travaille7.jpg' },
  { label: 'Aide-cuisinier', icon: '/image/fakeOffers/travaille8.jpg' },
  { label: 'Gestion de mails', icon: '/image/fakeOffers/travaill9.jpg' },
  
  ];

  fakeTestimonials = [
    {
      message: 'Grâce à PocketJob, j’ai trouvé une mission en seulement 2 jours !',
      name: 'Godcha Roua',
      role: 'Candidate',
      photo: '/image/user1.jpg'
    },
    {
      message: 'Une plateforme intuitive qui facilite vraiment le recrutement temporaire.',
      name: 'Adem Gara',
      role: 'Employeur',
      photo: '/image/user3.jpeg'
    },
    {
      message: 'Rapide, simple et efficace. Je recommande à 100% !',
      name: 'Abir Touay',
      role: 'Candidate',
      photo: '/image/user2.jpg'
    }
  ];

  search = {
    title: '',
    location: '',
    type: '',
    startDate: '',
    company: '',
    seniority: ''
  };

  constructor(private router: Router) {}

  onSearch() {
    console.log("Recherche simple par:", this.searchKeyword, this.searchRegion);
  }

  toggleAdvancedFilters() {
    this.showFilters = !this.showFilters;
  }

  applySearch() {
    this.filteredOffers = this.fakeOffers.filter(offer => {
      return (
        (!this.search.title || offer.title.toLowerCase().includes(this.search.title.toLowerCase())) &&
        (!this.search.location || offer.location.toLowerCase().includes(this.search.location.toLowerCase())) &&
        (!this.search.type || offer.type === this.search.type) &&
        (!this.search.company || offer.company.toLowerCase().includes(this.search.company.toLowerCase())) &&
        (!this.search.startDate || new Date(offer.startDate ?? '') >= new Date(this.search.startDate)) &&
        (!this.search.seniority || offer.seniority === this.search.seniority)
      );
    });
  }

  goToOffer(id: number) {
    this.router.navigate(['/offres', id]);
  }

  ngOnInit(): void {
    this.filteredOffers = this.fakeOffers;
  }
}
