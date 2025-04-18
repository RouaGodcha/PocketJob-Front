import { Component } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MediaService } from '../_services/media.service';
import { TableLazyLoadEvent } from 'primeng/table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medias',
  standalone: false,
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.scss'
})
export class MediasComponent {
  show : any;
  page: any =1;
  per_page: any = 10;
  orderBy: any;
  orderByType: any;
  total: any = 0;
  loading: boolean = false;
  filter: string = '';
  searchSubject = new Subject<string>();
  destroy$ = new Subject<void>();
  mediasList: any;
  selectedMedia: any;

  constructor(
    private mediaService: MediaService, // Assuming we have a service to fetch medias
  ) { }

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.performSearch(query);
      });
  }

  performSearch(query: string) {
    this.filter = query ?? '';
    this.page = 1;
    this.getMediaList();
  }


  lazyLoad(event : TableLazyLoadEvent): void {
    this.page = (event.first || 0) / (event.rows || 10) + 1;
    this.per_page = event.rows || 10;
    this.orderBy = event.sortField || '';
    this.orderByType = event.sortOrder === 1? 'asc' : 'desc';
    this.getMediaList();
  }


  getMediaList() {
    const data = {
      search: this.filter,
      paginate: 1,
      per_page: this.per_page,
      page: this.page,
      orderBy: this.orderBy,
      orderByType: this.orderByType,
    };
    this.mediaService.getMediaList(data).subscribe((res: any) => {
      this.mediasList = res.body.data;
      this.total = res.body.paginator.total;
    });
  }

search(event:any) {
  const query = event.target.value;  //le texte entré.
  this.searchSubject.next(query);  //permet de gérer les recherches en temps réel   `|||Sert à déclencher des appels API avec debounce (anti-spam de requêtes)

}

deleteMedia(id: any) {
  Swal.fire({
    text: 'Voulez-vous supprimer?',
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
      this.mediaService.deleteMedia(id).subscribe((res: any) => {
        Swal.fire({
          text: 'supprimé avec succès',
          icon: 'success',
          customClass: {
            confirmButton: 'btn-primary',
          },
        }).then(() => {
          this.getMediaList();
        });
      });
    }
  });
}

getMediaListe() {
  const data = {
    search: this.filter,
    paginate: 1,
    per_page: this.per_page,
    page: this.page,
    orderBy: this.orderBy,
    orderByType: this.orderByType,
  };
  this.mediaService.getMediaList(data).subscribe((res: any) => {
    this.mediasList = res.body.data;
    this.total = res.body.paginator.total;
  });
}

showItem(item: any) {
  this.show = true;
  this.selectedMedia = item;
}
closeMedia() {
  this.show = false;
}

}
