import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../../_services/candidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-candidat',
  standalone: false,
  templateUrl: './dashboard-candidat.component.html',
  styleUrl: './dashboard-candidat.component.scss'
})
export class DashboardCandidatComponent implements OnInit {
  candidat: any;
  constructor(private candidatService: CandidatService, private router: Router) {}

  ngOnInit(): void {
    this.candidatService.getProfile().subscribe({
      next: data => this.candidat = data,
      error: err => console.error('Erreur de chargement', err)
    });
    this.candidat = {
      nom: 'Ahmed Trabelsi',
      email: 'ahmed@example.com',
      cv: 'https://example.com/cv.pdf',
      is_validated: false
    };
  }
  goToEdit(): void {
    this.router.navigate(['/mon-compte/edit-profile']);
  }

}
