import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidat',
  standalone:false,
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss'],
})
export class CandidatComponent implements OnInit {
  @Input() show: boolean = false;
  candidats: any[] = [];
  candidatsToDelete: any;
  showDelete = false;
  isModalOpen = false;
  loading = false;
  first = 0;
  total = 0;
  per_page = 10;
  page = 1;
  setPaginator = false;
  filter = '';
  diplomas: any = [];
  allStatus: any[] = [];
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  isFakeData = true;
  selectedCandidat: any = null;
  modalVisible: boolean = false;

  constructor(
    private candidatService: CandidatService,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allStatus = [
      { name: this.translate.instant('ACTIVE'), value: 'ACTIVE' },
      { name: this.translate.instant('PENDING'), value: 'PENDING' },
      { name: this.translate.instant('DISABLED'), value: 'DISABLED' },
    ];

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.per_page = +params['per_page'] || 10;
      if (params['page']) {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getCandidatsList();
    });

    this.getDiplomesList();

    this.searchSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((query) => this.performSearch(query));
  }

  lazyLoad(event: any) {
    if (this.setPaginator) {
      event.first = (this.page - 1) * this.per_page;
      this.setPaginator = false;
    }
    this.page = event.first / event.rows + 1;
    this.per_page = event.rows;
    this.getCandidatsList();
  }

  search(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  performSearch(query: string) {
    this.filter = query || '';
    this.page = 1;
    this.getCandidatsList();
  }

  getCandidatsList() {
    if (this.isFakeData) {
      this.loading = true;
      const fakeCandidats = [
        { id: 1, firstname: 'Ahmed', lastname: 'Ali', email: 'ahmed.ali@example.com', diplome: 'Baccalauréat', phone: '1234567890', status: 'ACTIVE', created_at: new Date('2023-01-15') },
        { id: 2, firstname: 'Sara', lastname: 'Ben Ali', email: 'sara.benali@example.com', diplome: 'Master Informatique', phone: '9876543210', status: 'PENDING', created_at: new Date('2023-02-20') },
        { id: 3, firstname: 'Khaled', lastname: 'Brahim', email: 'khaled.brahim@example.com', diplome: 'Licence', phone: '5647382910', status: 'DISABLED', created_at: new Date('2023-03-10') },
      ];
      setTimeout(() => {
        this.candidats = fakeCandidats;
        this.total = fakeCandidats.length;
        this.loading = false;
      }, 1500);
    } else {
      this.candidatService.getCandidatsList(this.page, this.per_page, this.filter).subscribe((data: any) => {
        this.candidats = data.candidats;
        this.total = data.total;
        this.loading = false;
      });
    }
  }

  getDiplomesList() {
    this.candidatService.getDiplomasList().subscribe((data: any) => {
      this.diplomas = data;
    });
  }

  updateCandidatsStatus(id: number, event: any) {
    this.candidatService.changeStatus(id, event.value).subscribe(() => {
      this.getCandidatsList();
    });
  }

  deleteCandidat(candidat: any) {
    Swal.fire({
      text: 'Voulez-vous supprimer ce candidat ?',
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
        this.candidatService.deletCandidat(candidat.id).subscribe(() => {
          Swal.fire({
            text: 'Candidat supprimé avec succès',
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.getCandidatsList();
          });
        });
      }
    });
  }

  openPages(id: any) {
    this.router.navigate([`/admin/users/candidats/view-candidat/${id}`]);
  }

  candidatDetails(id: any) {
   
    this.router.navigate([`/admin/users/candidats/view-candidat/${id}`]);
  }

  updateCandidat(candidat: any) {
    this.selectedCandidat = candidat;
    this.router.navigate([`/admin/users/candidats/update-candidat`, candidat.id]);
  }
}
