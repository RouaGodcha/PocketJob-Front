// ✅ TypeScript - candidat.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-candidat',
  standalone: false,
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss'],
})
export class CandidatComponent implements OnInit {
  addCandidat: boolean = false;
  updateCandidatVisible: boolean = false;
  selectedCandidatToUpdate: any;
  candidats: any[] = []; // ✅ Correction ici
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  orderBy: any;
  orderByType: any;
  filter: string = '';
  loading: boolean = false;
  diplomas: any;
  searchSubject = new Subject<string>();
  destroy$ = new Subject<void>();
  setPaginator: boolean = false;
  first: number = 0;

  allStatus: any[] = [];

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

    this.searchSubject
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((query) => this.performSearch(query));
  }

  lazyLoad(event: TableLazyLoadEvent) {
    if (this.setPaginator) {
      event.first = (this.page - 1) * this.per_page;
      this.setPaginator = false;
    }
    this.page = (event.first || 0) / (event.rows || 10) + 1;
    this.per_page = event.rows || 10;
    this.orderBy = event.sortField;
    this.orderByType = event.sortOrder === 1 ? 'ASC' : 'DESC';
    this.getCandidatsList();
  }

  getCandidatsList() {
    const data = {
      search: this.filter,
      paginate: 1,
      per_page: this.per_page,
      page: this.page,
    };
    this.loading = true;
    this.candidatService.getCandidatsList(data).subscribe({
      next: (res: any) => {
        this.candidats = res.body.candidats;
        this.total = res.body.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement candidats', err);
        this.loading = false;
      }
    });
  }
  

  performSearch(query: string) {
    this.filter = query ?? '';
    this.page = 1;
    this.getCandidatsList();
  }

  search(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  addChatCandidat() {
    this.addCandidat = true;
  }

  CandidatAdded() {
  this.addCandidat = false;
  this.getCandidatsList(); // recharge automatiquement la liste
}


  closeAddCandidat() {
    this.addCandidat = false;
  }

  candidatDetails(id: any) {
    this.router.navigate([`/admin/users/candidats/view-candidat/${id}`], {
      queryParams: { page: this.page, per_page: this.per_page },
    });
  }

  updateCandidat(candidat: any) {
    this.updateCandidatVisible = true;
    this.selectedCandidatToUpdate = candidat;
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

  updateCandidatStatus(id: number, status: boolean) {
    this.candidatService.updateStatus(id, status).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}