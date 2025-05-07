import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Offer {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  startDate?: string;
  seniority?: string;
  mapUrl?: string;
  salary?: string;  // Add the salary property
}


@Component({
  selector: 'app-home',
  template: `
 <app-chatbot></app-chatbot>
 <!-- reste de la template -->
 `,
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isMobile: boolean = false;

  searchKeyword = '';
  searchRegion = '';
  showFilters = false;

  filteredOffers: Offer[] = [];
  selectedOffer: Offer | null = null;

  fakeOffers: Offer[] = [
    { id: 1, title: 'Serveur en restauration', company: 'sousse', location: 'tunisie', type: 'Temps partiel', mapUrl: 'https://www.google.com/maps/embed?...' },
    { id: 2, title: 'Préparateur de commande', company: 'Amazon', location: 'Lille', type: 'Temps plein', mapUrl: 'https://www.google.com/maps/embed?...' },
    { id: 3, title: 'Aide-soignant', company: 'Clinique Santé Plus', location: 'Monastir', type: 'Intérim', mapUrl: 'https://www.google.com/maps/embed?...' },
    { id: 4, title: 'Vendeur en boutique', company: 'Zara', location: 'Mall of Sfax', type: 'CDD', mapUrl: 'https://www.google.com/maps/embed?...' },
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
    { label: 'Vente', icon: '/image/fakeOffers/travaille44.jpg' },
    { label: 'Caissier', icon: '/image/fakeOffers/travaille5.jpg' },
    { label: 'Garde d’enfants', icon: '/image/fakeOffers/travaille3.jpg' },
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

  ngOnInit(): void {
    this.filteredOffers = this.fakeOffers;
    this.isMobile = window.innerWidth < 768;
  }

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
    const offer = this.filteredOffers.find(o => o.id === id);
    if (offer) {
      this.selectedOffer = offer;
    }
    this.router.navigate(['/home/offres/details-offre', id]); // Navigate to the offer details page
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elements = document.querySelectorAll('.animate-fadeUp, .animate-fadeIn');
    elements.forEach((el: any) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.style.animationPlayState = 'running';
      }
    });
  }
}

