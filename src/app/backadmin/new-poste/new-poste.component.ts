import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { NewsService } from '../_services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-new-poste',
  standalone: false,
  templateUrl: './new-poste.component.html',
  styleUrl: './new-poste.component.scss'
})
export class NewPosteComponent implements OnInit {

  @ViewChild('ddstatus') ddstatus!: Dropdown;
  @ViewChild('ddformat') ddformat!: Dropdown;
  //  utilisé pour déclencher des recherches avec un petit délai 
  private searchSubject = new Subject<string>();
  //  utilisé pour désabonner les observables automatiquement à la destruction du composant.
  private destroy$ = new Subject<void>();  
  news: any[] = []; // liste des news
  newsToDelete: any; // news sélectionnée pour suppression
  showDelete: boolean = false; // afficher ou non la popup de suppression
  // pagination
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = "";
  loading: boolean = false;
  //Pour le filtrage (status et format), et le tri (champ + direction).
  status: any;
  showFilter = false;
 
  allStatus = [
    { id: 1, name: "Actif", value: "Actif" },
    { id: 2, name: "Non Actif", value: "Non Actif" },
  ];
  formats = [
    // type de contrat de la liste de offres d'mploi  
    { id: 1, name: "Image", value: "Image" }, // type de contrat de la liste de offres d'mploi dans time +
    { id: 2, name: "Video" , value: "Video" },
    { id: 3, name: "Pdf", value: "PDF" },
  ];

  tableData: any = [];
  orderBy: string | undefined;
  orderByType: string = "ASC";
  format: any;
  setPaginator: boolean = false;

  constructor(
    private newsService: NewsService,
    private routerService: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.per_page = +params['per_page'] || 10;
      if(params['page'])
      {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getNewsList();
    });
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.performSearch(query);
    });

  }
  lazyLoad(event: TableLazyLoadEvent) {
    if (this.setPaginator) {
      event.first = (this.page - 1) * 10;
      this.setPaginator = false;
    }
  
    this.page = ((event.first || 0) / (event.rows || 10)) + 1;
    this.per_page = event.rows || 10;
    this.orderBy = (typeof event.sortField === 'string') ? event.sortField : undefined;
    this.orderByType = event.sortOrder === 1 ? "ASC" : "DESC";
  
    this.getNewsList();
  }
  
  

  /*
  PAGINATION & filter
  */
  search(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }
  // Applique la recherche en relançant la requête.
  performSearch(query: string) {
    this.filter = query ?? "";
    this.page = 1;
    this.getNewsList();
  }
  // récupère la liste des news et Appels à l’API
  getNewsList() {
    let payload = {
      paginate: 1,
      per_page: this.per_page,
      page: this.page,
      filter: this.filter,
      status: this.status,
      orderBy: this.orderBy,
      orderByType: this.orderByType,
      type_media: this.format
    }
    this.loading = true;
    this.newsService.getNewsList(payload).subscribe((res: any) => {
      if (res.status === 200 && res.body.result === 'success') {
        this.news = res.body.data;
        this.total = res.body.paginator.total;
        this.last_page = res.body.paginator.last_page;
        this.loading = false;
        this.populateDataTable();
      }
    }, (error: any) => { console.error(error); });
  }
  toggleFilter(){
    this.showFilter = !this.showFilter;
  }
  
  resetFilter() {
    this.status = null;
    const event = new Event('event');
    this.ddstatus.clear(event);
    this.ddformat.clear(event);
    this.getNewsList();
  }

  filterChange() {
    this.page = 1;
    this.getNewsList();
  }
  selectStatus(event: any) {
    if (this.status !== event.value) {
      this.status = event.value;
    }
  }

  selectFormat(event: any) {
    if (this.format !== event.value) {
      this.format = event.value;
    }
  }

  // Navigation vers détails / modification 
  // ychouf ken amlt update ybadlk automatique 
  goToDetails(id: any) {
    this.routerService.navigate(['/dashboard/all-news/news/news-details/' + id],  { queryParams: { page: this.page, per_page: this.per_page } });
  }
  goToUpdate(id:any)
  {
    this.routerService.navigate(['/dashboard/all-news/news/update-poste/' + id],  { queryParams: { page: this.page, per_page: this.per_page } });
  }

  next() {
    this.page++;
    this.getNewsList();
  }
  prev() {
    this.page--;
    this.getNewsList();
  }
  reset() {
    this.page = 0;
    this.getNewsList();
  }

  isLastPage(): boolean {
    return this.page == this.last_page;
  }
  isFirstPage(): boolean {
    return this.page === 1;
  }



  /*
  ACTIONS
  */
  // Appel le service pour supprimer la news, et affiche une alerte SweetAlert.
  deleteNews() {
    this.newsService.deleteNews(this.newsToDelete.id).subscribe((res: any) => {
      if (res.body.result === "success" && res.status === 200) {
        this.newsToDelete = false;
        this.toggleDeleteNews();
        Swal.fire({
          text: this.translate.instant('NEWS.NEWS_DELETED'),
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.getNewsList();
        })
      }
    }, (error: any) => {
      console.error(error);
      Swal.fire({
        text: "error " + error.status,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn-primary',
        }
      })
    })
    console.log('supprimer avec succees')
  }
  // Suppression d’une actualité
  toggleDeleteNews(elm: any = false) {
    if (elm !== false) {
      this.newsToDelete = elm;
    }
    this.showDelete = !this.showDelete;
  }
  // traductions 
  getTranslatedStatus(status: string): string {
    return this.translate.instant(`STATUS.${status}`);
  }
  getTranslatedFormat(format: string): string {
    return this.translate.instant(`FORMATS.${format}`);
  }

  // Transformation des données pour le tableau
  populateDataTable() {
    this.tableData = [];
    this.news.forEach((news: any) => {
      const obj = {
        id: news.id,
        title: news.name,
        description:news.description,
        format: this.getTranslatedFormat(news.type_media) || '',
        position: news.position,
        status: this.getTranslatedStatus(news.status) || '',
        created_at: news.created_at,
      };
      this.tableData.push(obj);
    });
  }
}
