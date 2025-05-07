import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../_services/candidature.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  // Données factices
  fakeData = [
    { candidatNom: 'John Doe', offreReference: 'REF123', entrepriseNom: 'Entreprise A', domaine: 'Informatique', statut: 'en_attente' },
    { candidatNom: 'Jane Smith', offreReference: 'REF124', entrepriseNom: 'Entreprise B', domaine: 'Marketing', statut: 'accepte' },
    { candidatNom: 'Alex Johnson', offreReference: 'REF125', entrepriseNom: 'Entreprise C', domaine: 'Finance', statut: 'refuse' },
    { candidatNom: 'Maria Garcia', offreReference: 'REF126', entrepriseNom: 'Entreprise D', domaine: 'Design', statut: 'en_attente' },
    { candidatNom: 'Carlos Perez', offreReference: 'REF127', entrepriseNom: 'Entreprise E', domaine: 'Développement', statut: 'accepte' }
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

    // Remplacer l'appel réel par des données factices pour le test
    this.tableData = this.fakeData;  // Utilisation des données factices
    this.total = this.fakeData.length; // Total des éléments factices
    this.loading = false;

    // Appel API réel (commentez la ligne ci-dessous pour désactiver les données réelles)
    // this.candidatureService.getCandidatures(params).subscribe((response) => {
    //   this.tableData = response.data;
    //   this.total = response.total;
    //   this.loading = false;
    // });
  }

  modifier(c: any) {
    this.router.navigate(["/admin/candidature/update-candidature/:id"]);
  }

  confirmerAnnulation(c: any) {
    if (confirm('Voulez-vous vraiment annuler cette candidature ?')) {
      this.annulerCandidature(c.id);
    }
  }

  deleteCandidature(candidature: any) {
    Swal.fire({
      text: 'Voulez-vous supprimer cette candidature  ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidatureService.deleteCandidature(candidature.id).subscribe(() => {
          Swal.fire({
            text: 'Candidature supprimé avec succès',
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.loadData();
          });
        });
      }
    });
  }

  annulerCandidature(id: number) {
    this.candidatureService.deleteCandidature(id).subscribe(() => {
      this.loadData();
    });
  }
}
