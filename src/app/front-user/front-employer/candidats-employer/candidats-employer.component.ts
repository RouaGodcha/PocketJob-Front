import { Component, OnInit } from '@angular/core';
import { CandidatsEmployerService } from '../_services/candidats-employer.service';

@Component({
  selector: 'app-candidats-employer',
  standalone:false,
  templateUrl: './candidats-employer.component.html',
  styleUrls: ['./candidats-employer.component.scss']
})
export class CandidatsEmployerComponent implements OnInit {
  candidats: any[] = [];
  loading: boolean = true;

  constructor(private candidatsEmployerService: CandidatsEmployerService) {}

  ngOnInit(): void {
    // 🔁 Choisir l'une des deux méthodes :
  
    //this.fetchCandidats(1, 10, '');        // ✅ Utilise l'API réelle
  
    this.getCandidatsFake();            // ✅ Tu peux activer cette ligne pour tester avec FAKE data
  }
  

  // ✅ Appel réel à l'API
  fetchCandidats(page: number, perPage: number, filter: string): void {
    this.loading = true;
    this.candidatsEmployerService.getCandidatsList(1, 10, '', 1).subscribe({
      next: (data) => {
        this.candidats = data.data || data; // selon structure JSON
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  // 🧪 Fake data pour test sans backend
  getCandidatsFake(): void {
    setTimeout(() => {
      this.candidats = [
        {
          nom: 'Ben Ali',
          prenom: 'Youssef',
          email: 'youssef@example.com',
          offre: { titre: 'Serveur événementiel' },
          remuneration: 600,
          message: 'Disponible les soirs et week-ends.',
          created_at: new Date()
        },
        {
          nom: 'Trabelsi',
          prenom: 'Nadia',
          email: 'nadia.trabelsi@example.com',
          offre: { titre: 'Hôtesse d’accueil' },
          remuneration: 750,
          message: '',
          created_at: new Date('2025-04-25')
        },
        {
          nom: 'Godcha',
          prenom: 'Roua',
          email: 'rouagodcha@example.com',
          offre: { titre: 'caissier' },
          remuneration: 400,
          message: '',
          created_at: new Date('2025-05-30')
        }
      ];
      this.loading = false;
    }, 1000);
  }
}
