import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-candidat',
  standalone : false ,
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss'],
})
export class CandidatComponent implements OnInit {
  @Input() show: boolean = false; // Ajoutez cette ligne
  candidats: any[] = [];
  candidatsToDelete: any;
  showDelete = false;
  isModalOpen = false;
  loading = false;
  public showingAddCandidat: boolean = false;
  public showingUpdateCandidat: boolean = false;
  public selectedCandidatToUpdate: any;
  

  // Pagination & Recherche
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
    this.loading = true;
    this.candidatService.getCandidatsList().subscribe(
      (res: any) => {
        this.candidats = res;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  getDiplomesList() {
    this.candidatService.getDiplomasList({ paginate: 0 }).subscribe(
      (res: any) => {
        if (res.body?.result === 'success') {
          this.diplomas = res.body.data;
        }
      },
      (err) => console.error(err)
    );
  }

  updateCandidatsStatus(id: number, event: any) {
    const formData = { status: event.value };
    this.candidatService.changeStatus(id, formData).subscribe(
      () => this.getCandidatsList(),
      (err : any ) => console.error(err)
    );
  }

  displayUpdateUser(candidat : any) {

  }

  candidatDetails(id: number) {
    this.router.navigate(['/dashboard/candidats/details/' + id], {
      queryParams: { page: this.page, per_page: this.per_page },
    });
  }

  openPages(id: number) {
    this.router.navigate(['/dashboard/candidats/pages/' + id]);
  }

  
  toggleDeleteCandidat(elm: any = false) {
    if (elm !== false) {
      this.candidatsToDelete = elm;
    }
    this.showDelete = !this.showDelete;
  }

  displayUpdateCandidats(candidat: any) {
    this.selectedCandidatToUpdate = candidat;
    this.isModalOpen = true;
  }


  deleteCandidat(){
    this.candidatService.deletCandidat(this.candidatsToDelete.id).subscribe(
      (res: any) => {
        if (res.body.result === 'success' && res.status === 200) {
          this.candidatsToDelete = false;
          this.toggleDeleteCandidat();
          Swal.fire({
            text: 'Page supprimé avec succès',
            icon: 'success',
            showCancelButton: false,
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.getCandidatsList();
          });
        }
      },
      (error: any) => {
        console.error(error);
        Swal.fire({
          text: 'error ' + error.status,
          icon: 'error',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          },
        });
      }
    );
  }

  onCandidatAdded(event: any) {
    this.isModalOpen = false;
    this.getCandidatsList();
  }
}
