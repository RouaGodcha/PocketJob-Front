import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../_services/candidature.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidature',
  standalone:false,
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss'],
})
export class CandidatureComponent implements OnInit {
  candidature: any[] = [];
  tableData: any[] = [];
  total: number = 0;
  first: number = 0;
  per_page: number = 10;
  loading: boolean = false;

  filters = {
    nomCandidat: '',
    offreReference: '',
    entreprise: '',
    domaine: '',
    statut: null,
  };

  statusOptions = [
    { label: 'Tous', value: null },
    { label: 'En attente', value: 'en_attente' },
    { label: 'Accepté', value: 'accepte' },
    { label: 'Refusé', value: 'refuse' },
  ];

  constructor(private candidatureService: CandidatureService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  lazyLoad(event: any) {
    this.first = event.first || 0;
    this.per_page = event.rows || 10;
    this.loadData();
  }

  search() {
    this.first = 0;
    this.loadData();
  }

  loadData() {
    this.loading = true;

    const params = {
      page: Math.floor(this.first / this.per_page) + 1,
      per_page: this.per_page,
      ...this.filters,
    };

    this.candidatureService.getCandidatures(params).subscribe((response) => {
      this.tableData = response.data;
      this.total = response.total;
      this.loading = false;
    });
  }

  modifier(c: any) {
    this.router.navigate(["/dashboard/candidature/update-candidature/:id"]);
  }

  confirmerAnnulation(c: any) {
    if (confirm('Voulez-vous vraiment annuler cette candidature ?')) {
      this.annulerCandidature(c.id);
    }
  }

  annulerCandidature(id: number) {
    this.candidatureService.deleteCandidature(id).subscribe(() => {
      this.loadData();
    });
  }
}
