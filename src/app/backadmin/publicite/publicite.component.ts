import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { PubliciteService } from '../_services/publicite.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-publicite',
  standalone:false,
  templateUrl: './publicite.component.html',
  styleUrls: ['./publicite.component.scss'],
  providers: [MessageService]
})
export class PubliciteComponent implements OnInit {
  publicites: any[] = [];
  publiciteToDelete: any = null;
  showDeletePopup: boolean = false;
  loading = false;

  filterNom: string = '';
  filterStatut: string | null = null;
  filterDateDebut: Date | null = null;
  filterDateFin: Date | null = null;

  first = 0;
  total = 0;
  per_page = 10;
  page = 1;
  setPaginator = false;
  filter = '';

  private searchSubject = new Subject<string>();

  allStatus = [
    { label: 'Tous', value: null },
    { label: 'Programmé', value: 'Programmé' },
    { label: 'Actif', value: 'Actif' },
    { label: 'Suspendu', value: 'Suspendu' },
    { label: 'Terminé', value: 'Terminé' },
    { label: 'Supprimée', value: 'Supprimée' }
  ];

  constructor(
    private publiciteService: PubliciteService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setFakePublicites(); // ← appel à notre fake data
    this.getPublicitesList();

    this.searchSubject.pipe(debounceTime(300)).subscribe(query => {
      this.filter = query;
      this.page = 1;
      this.setPaginator = true;
      this.getPublicitesList();
    });
  }

  setFakePublicites() {
    this.publicites = [
      {
        id: 1,
        nom: 'Promo Été 2024',
        statut: 'Actif',
        date_debut: new Date('2024-06-01'),
        date_fin: new Date('2024-08-31'),
        created_at: new Date('2024-05-10')
      },
      {
        id: 2,
        nom: 'Black Friday',
        statut: 'Programmé',
        date_debut: new Date('2024-11-20'),
        date_fin: new Date('2024-11-30'),
        created_at: new Date('2024-04-01')
      },
      {
        id: 3,
        nom: 'Winter Sales',
        statut: 'Supprimée',
        date_debut: new Date('2024-12-15'),
        date_fin: new Date('2025-01-15'),
        created_at: new Date('2024-06-20')
      }
    ];
  
    this.total = this.publicites.length;
  }
  

  getPublicitesList() {
    this.loading = true;
    this.publiciteService.getPublicites({ page: this.page, per_page: this.per_page, filter: this.filter }).subscribe(
      (res: any) => {
        this.publicites = res.data || res;
        this.total = res.total || res.length || 0;
        this.loading = false;
      },
      () => this.loading = false
    );
  }

  lazyLoad(event: any) {
    if (this.setPaginator) {
      event.first = (this.page - 1) * this.per_page;
      this.setPaginator = false;
    }
    this.page = event.first / event.rows + 1;
    this.per_page = event.rows;
    this.getPublicitesList();
  }

  search(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  openPages(id: number) {
    this.router.navigate(['/admin/publicites/pages', id]);
  }

  modifierPublicite(publicite: any) {
    this.router.navigate(['/admin/publicites/update-publicites', publicite.id]);
  }

  updatePubliciteStatus(id: number, event: any) {
    const formData = { status: event.value };
    this.publiciteService.changeStatus(id, formData).subscribe(
      () => this.getPublicitesList(),
      err => console.error(err)
    );
  }

  restaurerPublicite(publicite: any) {
    this.publiciteService.restorePublicite(publicite.id).subscribe(
      () => {
        publicite.status = "Actif";
        this.getPublicitesList();
        this.messageService.add({severity:'success', summary:'Succès', detail:'Publicité restaurée avec succès'});
      },
      err => console.error("Erreur restauration", err)
    );
  }

  ouvrirPopupSuppression(publicite: any) {
    this.publiciteToDelete = publicite;
    this.showDeletePopup = true;
  }

  fermerPopupSuppression() {
    this.publiciteToDelete = null;
    this.showDeletePopup = false;
  }

  confirmerSuppression() {
    if (!this.publiciteToDelete) return;

    this.publiciteService.deletePublicite(this.publiciteToDelete.id).subscribe(() => {
      this.publiciteToDelete.statut = 'Supprimée';
      this.getPublicitesList();
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Publicité supprimée avec succès' });
      this.fermerPopupSuppression();
    });
  }
}
