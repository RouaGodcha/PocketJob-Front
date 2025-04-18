import { Component } from '@angular/core';
import { NewsService } from '../../_services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-news',
  standalone: false,
  templateUrl: './view-news.component.html',
  styleUrl: './view-news.component.scss'
})
export class ViewNewsComponent  {
  news: any;
  newsId: any;
  yes = "Yes";
  no ="No";
  imageUrl!: any;
  videoUrl!: any;
  linkUrl!: any;
  page:number=1;
  perPage:number=10;
  showSuccess: any;
  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private router: Router
  ) { }



  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.newsId = params['id'];
        this.getNewsById();
      });

      this.activatedRoute.queryParams.subscribe(params => {
        this.page = params['page'] || 1;
        this.perPage = params['per_page'] || 10;
      });
  }

  getNewsById() {
    this.newsService.getNewsById(this.newsId).subscribe((res: any) => {
      if (res.status === 200 && res.body.result === 'success') {
        this.news = res.body.data;
      }
    }, (error: any) => {
      console.error(error);
    })
  }


  showStatusName(statusValue: string) {
    const allStatus = [
      { name: 'Actif', value: 'ACTIVE' },
      { name: 'Inactif', value: 'INACTIVE' },
      { name: 'Disabled', value: 'DISABLED' },
     ];
    const status = allStatus.find((s) => s.value === statusValue);
    if (status) {
      return status.name;
    } else {
      return "Statut inconnu";
    }
  }
  showFormatName(formatValue: string) {
    const formats = [
      { id: 1, name: "Image" , value: "IMAGE" },
      { id: 2, name: "Video", value: "VIDEO" },
      { id: 3, name: "Lien", value: "LINK" }
    ];
    const status = formats.find((s) => s.value === formatValue);
    if (status) {
      return status.name;
    } else {
      return "Format inconnu";
    }
  }

  cancel(){
    this.showSuccess = false;
    
  }

  closeModal() {
    history.back(); 
    this.cancel();   
  }
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }

}
