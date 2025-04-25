import { Component, OnInit } from '@angular/core';
import { OffresDetailsService } from '../../_services/offres-details.service';

@Component({
  selector: 'app-vos-emploi',
  standalone:false,
  templateUrl: './vos-emploi.component.html',
  styleUrls: ['./vos-emploi.component.scss']
})
export class VosEmploiComponent implements OnInit {
  emploisAcceptes: any[] = [];

  constructor(private offreDetailsService: OffresDetailsService) {}

  ngOnInit(): void {
    this.getEmploisAcceptes();
  }

  getEmploisAcceptes(): void {
    this.offreDetailsService.getEmploisAcceptes().subscribe({
      next: (data) => {
        this.emploisAcceptes = data;
      },
      error: (err) => {
        console.error('Erreur chargement emplois acceptés:', err);
      }
    });
  }
}
