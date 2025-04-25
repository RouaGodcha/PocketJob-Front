import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../_services/news.service';
import { News } from './news.model';

@Component({
  selector: 'app-news',
  standalone:false,
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: News[] = [];
  loading = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe({
      next: (data) => {
        this.newsList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement news:', err);
        this.loading = false;
      }
    });
  }

}
