import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { EmployerService } from '../_services/employer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employeur',
  standalone: false,
  templateUrl: './employeur.component.html',
  styleUrl: './employeur.component.scss'
})
export class EmployeurComponent  implements OnInit{
  @Input() show: boolean = false; // Ajoutez cette ligne

  employer: any[] = [];

  employerToDelete: any;
  showDelete = false;
  isModalOpen = false;
  loading = false;

  public showingAddEmployer: boolean = false;
  public showingUpdateEmployer: boolean = false;
  public selectedEmployerToUpdate: any;
  


  filterStatus: string = '';
  filterName: string = '';
  filterResponsable: string = '';
  filterDomaine: string = '';
  filterEmail: string = '';

  // Pagination & Recherche
  first = 0;
  total = 0;
  per_page = 10;
  page = 1;
  setPaginator = false;
  filter = '';
  allStatus: any[] = [];

  //diplomas: any = [];
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private employerService: EmployerService,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(){
    this.allStatus = [
        { name: 'ACTIVE', value: 'ACTIVE' },
        { name: 'PENDING', value: 'PENDING' },
        { name: 'DISABLED', value: 'DISABLED' },
        { name: 'BLOQUÉ', value: 'BLOQUE' },
        { name: 'SUSPENDU', value: 'SUSPENDU' },
        { name: 'SUPPRIMÉ', value: 'SUPPRIME' }
      ];

      this.getEmployerList();
      this.searchSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.filter = query;
        this.getEmployerList();
      });
  }


  getEmployerList() {
    this.loading = true;
    this.employerService.getEmployerList({ page: this.page, per_page: this.per_page, filter: this.filter }).subscribe(
      (res: any) => {
        this.employer = res.data || res;
        this.total = res.total || res.length || 0;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  // pour modifer le status 
  updateEmployerStatus(id: number, event: any) {
    const formData = { status: event.value };
    this.employerService.changeStatus(id, formData).subscribe(
      () => this.getEmployerList(),
      (err : any ) => console.error(err)
    );
  }
  employerDetails(id: number) {
    this.router.navigate(['/dashboard/employer/details/' + id], {
      queryParams: { page: this.page, per_page: this.per_page },
    });
  }

  openPages(id: number) {
    this.router.navigate(['/dashboard/employer/pages/' + id]);
  }

  displayUpdateEmployer(employer: any) {
  this.selectedEmployerToUpdate = employer; // Store the selected employer
  this.showingUpdateEmployer = true; // Show the AddEmployerComponent for editing
}

  toggleDeleteEmployer(elm: any = false){
    if (elm !== false) {
      this.employerToDelete = elm;
    }
    this.showDelete = !this.showDelete;
  }

  lazyLoad(event : any){
    if (this.setPaginator) {
      event.first = (this.page - 1) * this.per_page;
      this.setPaginator = false;
    }
    this.page = event.first / event.rows + 1;
    this.per_page = event.rows;
    this.getEmployerList();
  }
  search(event : any){
    const query = event.target.value;
    this.searchSubject.next(query);
  }
  //pour bien nettoyer l’abonnement de recherche.
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

 // Appliquer les filtres
  applyFilters() {
    this.filter = `${this.filterStatus} ${this.filterName} ${this.filterResponsable} ${this.filterDomaine} ${this.filterEmail}`;
    this.page = 1; // reset à la première page
    this.getEmployerList();
  }
  //// Restaurer un employeur supprimé
  restoreEmployer(id: number) {
    this.employerService.restoreEmployer(id).subscribe(
      () => this.getEmployerList(),
      (error) => console.error('Erreur lors de la restauration', error)
    );
  }
  //// Suppression définitive
  confirmPermanentDelete(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer définitivement cet employeur ?")) {
      this.employerService.permanentDeleteEmployer(id).subscribe(
        () => this.getEmployerList(),
        (error) => console.error('Erreur de suppression définitive', error)
      );
    }
  }
  
  
  
}
