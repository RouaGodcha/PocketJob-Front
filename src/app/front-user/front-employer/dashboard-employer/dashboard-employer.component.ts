import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { DashboardEmployerService } from '../_services/dashboard-employer.service';
import Chart from 'chart.js/auto';

// ✅ Déclarer google ici en haut (hors de la classe)
declare var google: any;

@Component({
  selector: 'app-dashboard-employer',
  standalone: false,
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss']
})
export class DashboardEmployerComponent  implements OnInit{
  dashboardData: any;  // Assure-toi de déclarer la variable pour les données
  googleStatus = 'Non initialisé';
  userName = 'Mohamed Ben Salem';
  activeBalance = 18350;

  stats = {
    offres: 12,
    candidatures: 34,
    entretiens: 4,
    messages: 7
  };
  
  notifications: string[] = [
    "Nouvelle candidature reçue",
    "Votre offre a été publiée",
    "Message reçu d’un candidat",
    "Entretien planifié pour lundi"
  ];
  

  constructor(private dashboardEmployerService: DashboardEmployerService) { }


 
  ngOnInit(): void {
    this.loadDashboardData();
  }
  ngAfterViewInit(): void {
    this.initChart();
    this.initMap();
  }

  
  // ✅ Initialiser le graphique avec Chart.js
  initChart(): void {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
          datasets: [{
            label: 'Offres',
            data: [10, 14, 8, 17, 22],
            borderColor: '#4eafff',
            tension: 0.3,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }

  initMap(): void {
    const mapElement = document.getElementById('map');
    if (mapElement && typeof google !== 'undefined') {
      new google.maps.Map(mapElement, {
        center: { lat: 36.8, lng: 10.2 },
        zoom: 12
      });
      this.googleStatus = '✅ Carte chargée';
    } else {
      this.googleStatus = '❌ Erreur de chargement';
    }
  }
  

  

   // Charger les données du tableau de bord
   loadDashboardData(): void {
    this.dashboardEmployerService.getDashboardData().subscribe(data => {
      this.dashboardData = data;  // Assigner les données récupérées
    });
  }
}
