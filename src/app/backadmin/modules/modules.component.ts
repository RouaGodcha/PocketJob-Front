import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ModulesService } from '../_services/modules.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-modules',
  standalone: false,
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent implements OnInit {
  modules :any[] =[];        // Liste des modules chargés
  diplomas :any =[];        // Liste des diplômes pour filtrer
  page : any =1;            // Numéro de page
  first : number = 0;       // Index de début (pagination PrimeNG)
  per_page : any = 10;      // Nombre d’éléments par page
  total : any =0;           // Nombre total d’éléments
  orderBy : string|undefined ; // Champ de tri
  orderByType : string = 'ASC'; // Sens de tri
  showFilter : boolean = false; // Affiche ou non les filtres
  filter : string ="";          // Terme de recherche
  diplomeId : any;              // Diplôme sélectionné
  loading : boolean = false;    // Affichage du loader
  setPaginator : boolean = false;

  allStatus: any = []; // Liste des statuts (actif, en attente, désactivé)
  private destroy$ = new Subject<void>();        // Utilisé pour arrêter des observables (nettoyage)
  private searchSubject = new Subject<string>(); // Utilisé pour gérer la recherche différée

 
  @ViewChild('ddsubject') ddsubject!: Dropdown;



  constructor(
    private modulesService: ModulesService,
    private router: Router,
    private translate: TranslateService,
    private route : ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.allStatus = [
      { id: 1, name: this.translate.instant('ACTIVE'), value: 'ACTIVE' },
      { id: 2, name: this.translate.instant('PENDING'), value: 'PENDING' },
      { id: 3, name: this.translate.instant('DISABLED'), value: 'DISABLED' },
    ];

    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.per_page = +params['per_page'] || 10;
      if (params['page']) {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getSubjectsList();
    });

    this.getDiplomasList();
    this.loadModules();  // Chargement des modules simulés
  }
  // Utilisation de données factices pour les modules
  loadModules() {
    this.loading = true;
    
    // Simulating job offer modules with fake data
    this.modules = [
      { 
        id: 1, 
        diploma: 'Bac', 
        name: 'Caissier dans un hôtel', 
        contractDuration: '6 mois', 
        salary: 1500, 
        skills: 'Gestion des caisses, service à la clientèle, comptabilité de base', 
        workLocation: 'Tunis', 
        description: 'Gérer les paiements et les caisses des clients à l\'hôtel.', 
        created_at: new Date(),
        status: 'ACTIVE' 
      },
      { 
        id: 2, 
        diploma: '1ere annee universitaire', 
        name: 'Chef de cuisine', 
        contractDuration: '1 an', 
        salary: 2500, 
        skills: 'Cuisine, gestion d\'équipe, hygiène alimentaire', 
        workLocation: 'Sousse', 
        description: 'Superviser la préparation des repas dans un restaurant haut de gamme.', 
        created_at: new Date(),
        status: 'ACTIVE'
      },
      { 
        id: 3, 
        diploma: 'Bac +3', 
        name: 'Responsable commercial', 
        contractDuration: '1 an', 
        salary: 3500, 
        skills: 'Négociation, gestion des ventes, relations clients', 
        workLocation: 'Tunis', 
        description: 'Gérer les ventes et les relations commerciales dans l\'entreprise.', 
        created_at: new Date(),
        status: 'ACTIVE'
      },
      { 
        id: 4, 
        diploma: 'Bac +5', 
        name: 'Ingénieur système', 
        contractDuration: '2 ans', 
        salary: 4000, 
        skills: 'Administration système, réseaux, sécurité informatique', 
        workLocation: 'Sfax', 
        description: 'Gérer l\'infrastructure informatique et les systèmes de sécurité.', 
        created_at: new Date(),
        status: 'ACTIVE'
      },
      { 
        id: 5, 
        diploma: 'Bac +2', 
        name: 'Hôtesse d\'accueil', 
        contractDuration: 'CDD', 
        salary: 1200, 
        skills: 'Accueil des clients, gestion des appels téléphoniques, service client', 
        workLocation: 'Tunis', 
        description: 'Assurer l\'accueil et la réception des clients dans l\'entreprise.', 
        created_at: new Date(),
        status: 'ACTIVE'
      },
      { 
        id: 6, 
        diploma: 'Bac +3', 
        name: 'Assistant RH', 
        contractDuration: '1 an', 
        salary: 2000, 
        skills: 'Gestion des ressources humaines, recrutement, gestion des dossiers du personnel', 
        workLocation: 'Ariana', 
        description: 'Assurer la gestion des ressources humaines et des recrutements.', 
        created_at: new Date(),
        status: 'PENDING'
      },    
      { 
        id: 4, 
        diploma: 'Bac +3', 
        name: 'Responsable Marketing', 
        contractDuration: '1 an', 
        salary: 3500, 
        skills: 'SEO, SEM, Google Analytics', 
        workLocation: 'Sousse', 
        description: 'Gestion des campagnes marketing en ligne.', 
        created_at: new Date(), 
        
      }
    ];
    
    this.loading = false;
    this.total = this.modules.length;  // Total based on the fake data length
}





updateUserStatus(id: any, event: any) {
  const formData = {
    status: event.value,
  };
  this.modulesService.changeStatus(id, formData).subscribe(
    (res: any) => {
      if (res.ok === true) {
        this.getSubjectsList();
      }
    },
    (error: any) => {
      console.error(error);
    }
  );
}

  getSubjectsList() {
    let data = {};
    if (this.diplomeId !== null) {
      data = {
        "paginate": 1,
        "page": this.page,
        "per_page": this.per_page,
        "filter": this.filter,
        "diploma_id": this.diplomeId
      };
    } else {
      data = {
        "paginate": 1,
        "page": this.page,
        "per_page": this.per_page,
        "filter": this.filter
      };
    }

    this.modulesService.getSubjectsList(data).subscribe((res: any)=>{
      if(res.body.result === "success") {
        this.modules = res.body.data;
        this.page = res.body.paginator.current_page;
        this.total = res.body.paginator.total;
      }
    });
  }

/**
   * Chargement des données via le lazy loading de PrimeNG
   */
lazyLoad(event: any): void {
  if(this.setPaginator)
    {
      event.first = (this.page -1 )*10
       this.setPaginator = false;
    }
  this.page = ((event.first || 0) / (event.rows || 10)) + 1;
  this.per_page = event.rows || 10;
  this.orderBy = event.sortField;
  this.orderByType = event.sortOrder === 1 ? "ASC" : "DESC"
  this.getSubjectsList();
}

getDiplomasList() {
  let payload = {
    paginate: 0
  }
  this.modulesService.getDiplomasList(payload).subscribe((res: any) => {
      if (res.body.result === "success" && res.status === 200) {
        this.diplomas = res.body.data;
      }
  },
  (error: any) => {
      console.error(error);
  })
}
  /**
   * Toggle de l'affichage des filtres
   */
  toggleFilter(){
    this.showFilter = !this.showFilter;
  }

  

  /**
   * Gère le champ de recherche
   */
  search(event: any): void {
    const query = event.target.value;
    this.searchSubject.next(query);
  }
  performSearch(query: string) {
    this.filter = query ?? "";
    this.page = 1;
    this.getSubjectsList();
  }
  
  filterChange() {
    this.page = 1;
    this.getSubjectsList();
  }


   /**
   * Réinitialise tous les filtres
   */
   resetFilter() {
    this.page = 1;
    this.diplomeId = null;
    const event = new Event('event');
    this.ddsubject.clear(event);
    this.getSubjectsList();
  }

  /**
   * Sélection d’un diplôme dans le filtre dropdown
   */
  selectDiplome(event: any): void {
    this.diplomeId = event.value;
  }
  /**
   * Redirection vers la page de modification ( )
   */
  UpdateOffre(id: number): void {
    this.router.navigate(['/admin/offre-emploi/modules/edit-offre', id]);
  }
 /**
   * Suppression d’un module
   */
 deleteModule(module: any): void {
  Swal.fire({
    text: 'Voulez vous supprimer ce module ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Annuler',
    reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel'
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.modulesService.deleteModule(module.id).subscribe((res: any)=>{
          Swal.fire({
            text: 'Module supprimé avec succès',
            icon :'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
          .then(()=>{
            this.getSubjectsList();
          })
        })
      }
    })
}
}


