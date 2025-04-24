import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from '../../../_services/offre.service';

@Component({
  selector: 'app-offre-details',
  standalone:false,
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']
})
export class OffreDetailsComponent implements OnInit {
  offre: any;
  propositionSalaire: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    // ✅ Fake data fallback (optionnel)
    const fakeOffres = [
      {
        id: 1,
        title: 'Serveur polyvalent',
        company: 'Brasserie du Parc',
        location: 'Tunis',
        type: 'Temps partiel',
        seniority: 'Débutant',
        description: 'Service en salle, prise de commande...',
        entreprise: { nom: 'Brasserie du Parc' }
      },
      {
        id: 2,
        title: 'Préparateur de commandes',
        company: 'Amazon Logistics',
        location: 'Sfax',
        type: 'Temps plein',
        seniority: 'Intermédiaire',
        description: 'Préparation de colis...',
        entreprise: { nom: 'Amazon Logistics' }
      }
    ];

    // D'abord chargement via API
    this.offreService.getOffreById(id).subscribe({
      next: (offre) => this.offre = offre,
      error: () => {
        // Si erreur → on essaie avec fake data
        this.offre = fakeOffres.find(o => o.id === id);
        if (!this.offre) {
          alert('Aucune offre trouvée avec cet ID');
          this.router.navigate(['/home/offres']);
        }
      }
    });
  }

  postuler(): void {
    const isAuthenticated = localStorage.getItem('token'); // ou un vrai service d'auth
    if (!isAuthenticated) {
      // Redirection vers inscription candidat
      this.router.navigate(['/home/homeRegister/inscription']);
      return;
    }

    if (this.propositionSalaire) {
      this.offreService.postuler(this.offre.id, 2, this.propositionSalaire).subscribe({
        next: () => alert('✅ Postulation envoyée !'),
        error: () => alert('❌ Erreur de postulation.')
      });
    } else {
      alert('Veuillez saisir une rémunération.');
    }
  }

  goBack(): void {
    this.router.navigate(['/home/offres']);
  }
}
