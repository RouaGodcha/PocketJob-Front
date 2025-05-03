import { Component } from '@angular/core';
import { RendezVousEmployerService } from '../_services/rendez-vous-employer.service';

@Component({
  selector: 'app-rendez-vous-employer',
  standalone: false,
  templateUrl: './rendez-vous-employer.component.html',
  styleUrl: './rendez-vous-employer.component.scss'
})
export class RendezVousEmployerComponent {
  entretiens: any[] = [];
  loading: boolean = true;

  constructor(private rendezVousEmployerService: RendezVousEmployerService) {}

  ngOnInit(): void {
    // 🔁 Choisir l'une des deux méthodes :
    // this.fetchEntretiens(); // ✅ API réelle
    this.loadFakeEntretiens(); // ✅ FAKE pour test
  }

  // ✅ Appel API réel
  fetchEntretiens(): void {
    const employeurId = 1; // Id dynamique à récupérer selon ton app
    this.rendezVousEmployerService.getEntretiensList(employeurId).subscribe({
      next: (data) => {
        this.entretiens = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // 🧪 Fake data
  loadFakeEntretiens(): void {
    setTimeout(() => {
      this.entretiens = [
        {
          candidat: 'Youssef Ben Ali',
          date: '2025-05-04',
          heure: '10:00',
          poste: 'Serveur événementiel',
          status: 'Confirmé'
        },
        {
          candidat: 'Nadia Trabelsi',
          date: '2025-05-06',
          heure: '14:30',
          poste: 'Hôtesse',
          status: 'En attente'
        }
      ];
      this.loading = false;
    }, 1000);
  }
}
