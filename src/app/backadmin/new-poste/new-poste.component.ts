import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { NewsService } from '../_services/news.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-poste',
  standalone:false,
  templateUrl: './new-poste.component.html',
  styleUrls: ['./new-poste.component.scss']
})
export class NewPosteComponent implements OnInit {

  @ViewChild('ddstatus') ddstatus!: Dropdown;
  @ViewChild('ddformat') ddformat!: Dropdown;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  news: any[] = [];
  newsToDelete: any;
  showDelete: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  filter: string = '';
  loading: boolean = false;
  status: any;
  showFilter = false;
  allStatus = [
    { id: 1, name: 'Actif', value: 'Actif' },
    { id: 2, name: 'Non Actif', value: 'Non Actif' },
  ];
  formats = [
    { id: 1, name: 'Image', value: 'Image' },
    { id: 2, name: 'Video', value: 'Video' },
    { id: 3, name: 'Pdf', value: 'PDF' },
  ];
  tableData: any = [];
  orderBy: string | undefined;
  dir: string | undefined;

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => {
      this.getNewsList();
    });
    this.getNewsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  lazyLoad(event: any) {
    this.first = event.first;
    this.per_page = event.rows;
    this.page = event.page + 1;
    this.getNewsList();
  }

  getNewsList() {
    this.loading = true;
    const payload = {
      page: this.page,
      per_page: this.per_page,
      search: this.filter,
      status: this.status ? this.status : null
    };

    this.newsService.getNewsList(payload).subscribe((res: any) => {
      if (res.status === 200 && res.body.result === 'success') {
        this.news = res.body.data;
        this.total = res.body.paginator.total;
        this.tableData = this.news;
        this.loading = false;
      }
    });
  }

  search(event: any) {
    this.filter = event.target.value;
    this.searchSubject.next(this.filter);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  selectStatus(event: any) {
    this.status = event.value;
  }

  selectFormat(event: any) {
    this.filter = event.value;
    this.getNewsList();
  }

  filterChange() {
    this.getNewsList();
  }

  resetFilter() {
    this.status = null;
    this.filter = '';
    this.getNewsList();
  }

  toggleDeleteNews(news?: any) {
    if (news) {
      this.newsToDelete = news;
    }
    this.showDelete = !this.showDelete;
  }

  deleteNews() {
    if (this.newsToDelete) {
      this.newsService.deleteNews(this.newsToDelete.id).subscribe(() => {
        this.getNewsList();
        this.toggleDeleteNews();
      });
    }
  }

  goToDetails(id: number) {
    this.router.navigate([`/dashboard/all-news/newposte/news-details/${id}`]);
  }

  goToUpdate(id: number) {
    this.router.navigate([`/dashboard/all-news/newposte/update-poste/${id}`]);
  }
}
