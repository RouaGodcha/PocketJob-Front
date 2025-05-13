import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../_services/employer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-employeur',
  templateUrl: './employeur.component.html',
  standalone:false,
  styleUrls: ['./employeur.component.scss']
})
export class EmployeurComponent implements OnInit {
  showAddEmployer : boolean = false;
  updateEmployer: boolean = false;
  selectedEmployerToUpdate: any;
  employer: any[] = [];
  page: number = 1;
  per_page: number = 10;
  total: number = 0;
  loading: boolean = false;
  filter: string = '';
  searchSubject = new Subject<string>();
  destroy$ = new Subject<void>();
  setPaginator: boolean = false;
  first: number = 0;

  allStatus: any[] = [
    { name: 'ACTIVE', value: 'ACTIVE' },
    { name: 'PENDING', value: 'PENDING' },
    { name: 'DISABLED', value: 'DISABLED' },
    { name: 'BLOQUÉ', value: 'BLOQUE' },
    { name: 'SUSPENDU', value: 'SUSPENDU' },
    { name: 'SUPPRIMÉ', value: 'SUPPRIME' }
  ];

  constructor(
    private employerService: EmployerService,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.per_page = 9999; // afficher un maximum
      if (params['page']) {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getEmployerList();
    });

    this.searchSubject
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.performSearch(query);
      });
  }

  UpdateEmployer(employer: any) {
    this.selectedEmployerToUpdate = employer;
    this.router.navigate([`/admin/users/employers/update-employer`, employer.id]);
  }

  getEmployerList() {
    const data = { page: 1, per_page: 9999, filter: this.filter };
    this.employerService.getEmployerList(data).subscribe((res: any) => {
      console.log('📦 Liste reçue :', res); // ← AJOUTE CECI
      this.employer = res;
      this.total = res.length;
    });
  }
  
  openUpdateEmployerModal(employer: any) {
    this.selectedEmployerToUpdate = employer;
    this.updateEmployer = true;
  }
  

  lazyLoad(event: TableLazyLoadEvent) {
    if (this.setPaginator) {
      event.first = (this.page - 1) * this.per_page;
      this.setPaginator = false;
    }
    this.page = Math.floor((event.first ?? 0) / (event.rows ?? this.per_page)) + 1;
    this.per_page = event.rows ?? this.per_page;
    this.getEmployerList();
  }

  performSearch(query: string) {
    this.filter = query ?? '';
    this.page = 1;
    this.getEmployerList();
  }

  search(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  openAddEmployerModal() {
    this.showAddEmployer  = true;
  }


  // Ferme la modale sans ajout
  closeAddEmployer() {
    this.showAddEmployer  = false;
  }

   // Ferme après ajout
   onEmployerAdded(newEmployer: any) {
    //this.employer.unshift(newEmployer); // insérer directement en haut de la liste
    //this.total++;
    //this.showAddEmployer  = false;
    this.page = 1;
    this.first = 0;
    this.setPaginator = true;
    this.getEmployerList();
  }

  editChatGroup(id: any) {
    this.updateEmployer = true;
    this.selectedEmployerToUpdate = id;
  }

  closeEditGroup() {
    this.updateEmployer = false;
    this.selectedEmployerToUpdate = '';
  }

  employerUpdated() {
    this.updateEmployer = false;
    this.selectedEmployerToUpdate = '';
    this.getEmployerList();
  }

  updateEmployerStatus(id: number, event: any) {
    const formData = { status: event.value };
    this.employerService.changeStatus(id, formData).subscribe(() => {
      this.getEmployerList();
    });
  }
  deleteEmployer(employer: any) {
    Swal.fire({
      text: 'Voulez-vous supprimer ce employeur ?',
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
        this.employerService.deleteEmployer(employer.id).subscribe(() => {
          Swal.fire('Succès', 'Employeur supprimé avec succès', 'success').then(() => {
            this.getEmployerList(); // 🔁 recharge la liste après suppression
          });
        });
      }
    });
  }
  
  restoreEmployer(id: number) {
    this.employerService.restoreEmployer(id).subscribe(() => {
      this.getEmployerList();
    });
  }

  confirmPermanentDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cet employeur ?')) {
      this.employerService.permanentDeleteEmployer(id).subscribe(() => {
        this.getEmployerList();
      });
    }
  }

  EmployerDetails(id: number) {
    this.router.navigate([`/admin/users/employers/details/${id}`], {
      queryParams: { page: this.page, per_page: this.per_page },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
