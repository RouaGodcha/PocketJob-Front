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

    const fakeOffres = [
      {
        id: 1,
        title: 'Serveur polyvalent',
        company: 'Brasserie du Parc',
        location: 'Tunis',
        type: 'Temps partiel',
        seniority: 'Débutant',
        description: 'Service en salle, prise de commande...',
        mapUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51810.148111710376!2d10.691105868038033!3d35.74750473767396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13020cc09c631e5d%3A0x94b845be8275085e!2sHilton%20Skanes%20Monastir%20Beach%20Resort!5e0!3m2!1sfr!2stn!4v1745860237714!5m2!1sfr!2stn" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        entreprise: { nom: 'Brasserie du Parc',
          companyImage: '/image/serveurPark.jpg',  // Add the company logo image URL

         }
      },
    ];
    this.offreService.getOffreById(id).subscribe({
      next: (offre) => this.offre = offre,
      error: () => {
        this.offre = fakeOffres.find(o => o.id === id);
        if (!this.offre) {
          alert('Aucune offre trouvée avec cet ID');
          this.router.navigate(['/home/offres']);
        }
      }
    });
  }

  postuler(): void {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
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
