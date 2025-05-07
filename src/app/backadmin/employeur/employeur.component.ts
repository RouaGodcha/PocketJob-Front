import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { EmployerService } from '../_services/employer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

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
  ngOnInit() {
    // Fake employer data
    this.employer = [
      {
        id: 1,
        name: 'Entreprise A',
        domaine: { name: 'Informatique' },
        type: 'Startup',
        document: { name: 'Bac +5' },
        adresse: 'Tunis, Rue 1',
        qualification: { name: 'Développeur' },
        creator: { firstname: 'Ahmed', lastname: 'Ali' },
        email: 'contact@entrepriseA.com',
        phone: '12345678',
        status: 'ACTIVE',
        created_at: '2025-04-28T10:00:00'
      },
      {
        id: 2,
        name: 'Entreprise B',
        domaine: { name: 'Marketing' },
        type: 'PME',
        document: { name: 'Bac +3' },
        adresse: 'Sfax, Rue 2',
        qualification: { name: 'Chef de projet' },
        creator: { firstname: 'Sofia', lastname: 'Mouhli' },
        email: 'contact@entrepriseB.com',
        phone: '87654321',
        status: 'PENDING',
        created_at: '2025-04-25T15:30:00'
      }
      // Add more data as needed for testing
    ];
  
    // Total records for pagination
    this.total = this.employer.length;
  
    this.allStatus = [
      { name: 'ACTIVE', value: 'ACTIVE' },
      { name: 'PENDING', value: 'PENDING' },
      { name: 'DISABLED', value: 'DISABLED' },
      { name: 'BLOQUÉ', value: 'BLOQUE' },
      { name: 'SUSPENDU', value: 'SUSPENDU' },
      { name: 'SUPPRIMÉ', value: 'SUPPRIME' }
    ];
  
    // Mocked search logic
    this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((query: string) => {
      this.filter = query;
      this.getEmployerList();
    });
  }


  getEmployerList() {
    this.loading = false; // No loading animation needed for mock data
    // Filter logic for fake data
    if (this.filter) {
      this.employer = this.employer.filter(emp => emp.name.toLowerCase().includes(this.filter.toLowerCase()));
    }
    this.total = this.employer.length; // Update total based on filtered results
  }
  // pour modifer le status 
  updateEmployerStatus(id: number, event: any) {
    const formData = { status: event.value };
    this.employerService.changeStatus(id, formData).subscribe(
      () => this.getEmployerList(),
      (err : any ) => console.error(err)
    );
  }
  EmployerDetails(id: number) {
    this.router.navigate([`/admin/users/employers/details/${id}`], {
      queryParams: { page: this.page, per_page: this.per_page },
    });
  }

  openPages(id: number) {
    this.router.navigate([`/admin/users/employers/details/${id}`]);
  }

  UpdateEmployer(employer: any) {
  this.selectedEmployerToUpdate = employer; // Store the selected employer
  this.router.navigate([`/admin/users/employers/update-employer`,employer.id]);

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
        this.employerService.deletEmployer(employer.id).subscribe(() => {
          Swal.fire({
            text: 'Employeur supprimé avec succès',
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.getEmployerList();
          });
        });
      }
    });
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
