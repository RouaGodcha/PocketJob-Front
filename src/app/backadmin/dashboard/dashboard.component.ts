import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
 standalone : false , 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor (
    private dashboardService : DashboardService
  ){}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadChartData();
  }

  // 📊 Statistiques générales affichées en haut
  statistics = [
    { title: 'Total des emplois', value: 1350 },
    { title: 'Candidats', value: 500 },
    { title: 'Offres Actuelles', value: 320 },
    { title: 'Employeurs', value: 150 }
  ];

  // 🎯 Filtres dynamiques
  regions = [
    { label: 'Tunis', value: 'tunis' },
    { label: 'Sousse', value: 'sousse' },
    { label: 'Sfax', value: 'sfax' }
  ];

  sectors = [
    { label: 'Événementiel', value: 'evenementiel' },
    { label: 'Logistique', value: 'logistique' },
    { label: 'Sécurité', value: 'securite' }
  ];

  contractTypes = [
    { label: 'CDD', value: 'cdd' },
    { label: 'CDI', value: 'cdi' },
    { label: 'Freelance', value: 'freelance' }
  ];

  selectedRegion: string | null = null;
  selectedSector: string | null = null;
  selectedContract: string | null = null;

  applyFilters() {
    console.log('Filtres appliqués :', this.selectedRegion, this.selectedSector, this.selectedContract);
    // Tu pourras ici appeler une méthode de service ou filtrer les graphiques dynamiquement.
  }

  // 📈 Données graphiques : Offres par secteur
  sectorChartLabels = ['Événementiel', 'Logistique', 'Sécurité'];
  sectorChartData = [
    { data: [120, 300, 150], label: 'Offres' }
  ];

  // 🎯 Satisfaction des employeurs
  satisfactionLabels = ['Satisfaits', 'Neutres', 'Insatisfaits'];
  satisfactionChartData = [
    {
      data: [70, 20, 10],
      backgroundColor: ['#4caf50', '#ffc107', '#f44336'],
      label: 'Satisfaction'
    }
  ];

  // 📆 Activité par jour
  activityLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
  activityData = [
    { data: [50, 80, 60, 90, 120], label: 'Publications' }
  ];

  loadStatistics(): void {
    this.dashboardService.getStatistics().subscribe(data => {
      this.statistics = [
        { title: 'Total des emplois', value: data.total_jobs },
        { title: 'Candidats', value: data.total_candidates },
        { title: 'Offres Actuelles', value: data.current_offers },
        { title: 'Employeurs', value: data.total_employers },
      ];
    });
  }

  loadChartData(): void {
    this.dashboardService.getChartData().subscribe(data => {
      this.sectorChartData = [
        { data: data.sector_chart_data.map((item: any) => item.count), label: 'Offres' }
      ];
      this.sectorChartLabels = data.sector_chart_data.map((item: any) => item.sector);
    });
  }


}
