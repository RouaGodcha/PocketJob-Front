import { Component } from '@angular/core';
import { CandidatService } from '../../_services/candidat.service';
import { Candidat } from '../candidat.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-candidat',
  standalone: false,
  templateUrl: './view-candidat.component.html',
  styleUrls: ['./view-candidat.component.scss'] // corrected "styleUrl" to "styleUrls"
})
export class ViewCandidatComponent {
  candidat?: Candidat;
  careers: any[] = []; // Properly initialized as an empty array
  niveau: any[] = []; // Properly initialized as an empty array

  constructor(
    private route: ActivatedRoute,
    private candidatService: CandidatService
  ) {}

  get candidatStatus(): string {
    return this.candidat?.status ? this.showStatusName(this.candidat.status) : 'Non défini';
  }

  get candidatEmail(): string {
    return this.candidat?.email || 'Non défini';
  }

  showStatusName(statusValue: string): string {
    const allStatus = [
      { id: 1, name: 'ACTIVE', value: 'ACTIVE' },
      { id: 2, name: 'PENDING', value: 'PENDING' },
      { id: 3, name: 'DISABLED', value: 'DISABLED' }
    ];
    const status = allStatus.find(s => s.value === statusValue);
    return status ? status.name : 'Status non défini';
  }

  ngOnInit(): void {
    const candidatId = Number(this.route.snapshot.paramMap.get('id'));
    if (candidatId) {
      this.candidatService.getCandidateById(candidatId).subscribe(candidat => {
        this.candidat = candidat;
        this.careers = candidat.careers || [];
        this.niveau = candidat.niveau || [];
      });
    }
  }

  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }
}
