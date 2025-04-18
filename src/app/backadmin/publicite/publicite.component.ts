import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { PubliciteService } from '../_services/publicite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicite',
  standalone : false ,
  templateUrl: './publicite.component.html',
  styleUrls: ['./publicite.component.scss']
})
export class PubliciteComponent implements OnInit {
  publicites: any[] = [];
  publiciteToDelete: any;
  showDelete = false;
  isModalOpen = false;
  loading = false;

  filterNom: string = '';
  filterStatut: string | null = null;
  filterDateDebut: Date | null = null;
  filterDateFin: Date | null = null;
 // Pagination & Recherche
 first = 0;
 total = 0;
 per_page = 10;
 page = 1;
 setPaginator = false;
 filter = '';
  allStatus = [
    { label: 'Tous', value: null },
    { label: 'Programmé', value: 'Programmé' },
    { label: 'Actif', value: 'Actif' },
    { label: 'Suspendu', value: 'Suspendu' },
    { label: 'Terminé', value: 'Terminé' },
    { label: 'Supprimée', value: 'Supprimée' }
  ];
  private searchSubject = new Subject<string>();

  get tableFilters() {
    const filters: any = {};
    if (this.filterNom) {
      filters['nom'] = { value: this.filterNom, matchMode: 'contains' };
    }
    if (this.filterStatut) {
      filters['statut'] = { value: this.filterStatut, matchMode: 'equals' };
    }
    return filters;
  }

  constructor(
    private publiciteService : PubliciteService,
    private router : Router
  ){}

  ngOnInit(): void {
    // Fake data temporaire
    this.publicites = [
      {
        id: 1,
        nom: 'Offre d’été',
        statut: 'Actif',
        date_debut: new Date(2025, 5, 1),
        date_fin: new Date(2025, 6, 1)
      },
      {
        id: 2,
        nom: 'Promo Ramadan',
        statut: 'Terminé',
        date_debut: new Date(2025, 2, 10),
        date_fin: new Date(2025, 3, 10)
      },
      {
        id: 3,
        nom: 'Publicité supprimée',
        statut: 'Supprimée',
        date_debut: new Date(2025, 1, 1),
        date_fin: new Date(2025, 1, 20)
      }
    ];

    this.searchSubject.pipe(debounceTime(300)).subscribe(query => {
      this.filter = query;
      this.page = 1;
      this.setPaginator = true;
      this.getPublicitesList();
    });
  }

  lazyLoad(event : any){
    if (this.setPaginator) {
      event.first = (this.page - 1) * this.per_page;
      this.setPaginator = false;
    }
    this.page = event.first / event.rows + 1;
    this.per_page = event.rows;
    this.getPublicitesList();
  }

  search(event : any){
    const query = event.target.value;
    this.searchSubject.next(query);
  }
  getPublicitesList(){
    this.loading = true;
    this.publiciteService.getPublicites({ page: this.page, per_page: this.per_page, filter: this.filter }).subscribe(
      (res: any) => {
        this.publicites = res.data || res;
        this.total = res.total || res.length || 0;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  openPages(id: number) {
    this.router.navigate(['/dashboard/publicites/pages', id]);
  }

  ouvrirPopupAjout() {
    console.log('Ajouter une nouvelle publicité');
    // Logique d’ouverture d’un modal ou redirection
  }

  ouvrirDetail(publicite: any) {
    console.log('Voir détails de la publicité', publicite);
    // Logique d’affichage des détails
  }

  modifierPublicite(publicite: any) {
    console.log('Modifier publicité', publicite);
    this.router.navigate(['/dashboard/publicites/update-publicite', publicite.id]);

    // Logique d’édition
  }

  // pour modifer le status 
  updatePubliciteStatus(id: number, event: any) {
    const formData = { status: event.value };
    this.publiciteService.changeStatus(id, formData).subscribe(
      () => this.getPublicitesList(),
      (err : any ) => console.error(err)
    );
  }

  supprimerPublicite(publicite: any) {
    this.publiciteService.deletePublicite(publicite.id).subscribe(() => {
      this.getPublicitesList();
    });
    console.log('Suppression logique', publicite);
    publicite.statut = 'Supprimée';
  }

  restaurerPublicite(publicite: any) {
    this.publiciteService.restorePublicite(publicite.id).subscribe(() => {
      this.getPublicitesList();
    });
    console.log('Restaurer publicité', publicite);
    publicite.statut = 'Actif'; // Ou l’ancien statut
  }
}
