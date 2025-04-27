import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../_services/dashboard.service';

@Component({
  selector: 'app-dashboard-candidat',
  standalone: false,
  templateUrl: './dashboard-candidat.component.html',
  styleUrl: './dashboard-candidat.component.scss'
})
export class DashboardCandidatComponent implements OnInit {
  offers: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Version API réelle
    // this.dashboardService.getRecentOffers().subscribe(data => this.offers = data);

    // Version test (fake)
    this.dashboardService.getFakeOffers().subscribe(data => this.offers = data);
  }
}
