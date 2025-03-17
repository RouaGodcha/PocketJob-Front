import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  standalone:false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [],
})
export class SidebarComponent implements OnInit {
  status = false;
  overlayStatus = false;
  showListPocketJob: boolean = false;
  showListNews: boolean = false;
  showListOffres: boolean = false;
  showListKit: boolean = false;
  
  currentFilter: any;
  state = {
    users: false,
  } as any;
  constructor(
    public router: Router,
    public translate: TranslateService,
    public _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.setCurrentFilter();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  clickEvent(): void {
    this.status = !this.status;
  }
  overlayStatusFct(): void {
    this.overlayStatus = false;
    this.showListPocketJob = false;
    this.showListNews = false;
    this.showListOffres = false;
    this.showListKit = false;
    this.closeFilters();
  }
  openFilter(name: string) {
    this.overlayStatus = !this.overlayStatus;
    Object.keys(this.state).forEach((key) => {
      if (name == key) {
        this.state[key] = !this.state[key];
      } else {
        this.state[key] = false;
      }
    });
  }
  closeFilters() {
    Object.keys(this.state).forEach((key) => {
      this.state[key] = false;
    });
  }
  isFilterActive(): boolean {
    let res = false;
    Object.keys(this.state).forEach((key) => {
      if (this.state[key]) {
        res = true;
      }
    });
    return res;
  }
  setCurrentFilter() {
    if (this._route.firstChild?.snapshot.routeConfig?.data) {
      this.currentFilter =
        this._route.firstChild?.snapshot.routeConfig?.data['activeFilter'];
    } else {
      this.currentFilter = null;
    }
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (this._route.firstChild?.snapshot.routeConfig?.data) {
          this.currentFilter =
            this._route.firstChild?.snapshot.routeConfig?.data['activeFilter'];
        } else {
          this.currentFilter = null;
        }
      }
    });
  }

  showList(listName: any) {
    if (listName === 'pocketjob') {
      this.showListPocketJob = !this.showListPocketJob;
      this.showListNews = false;
      this.showListOffres = false;
      this.showListKit = false;
    } else if (listName === 'news') {
      this.showListNews = !this.showListNews;
      this.showListPocketJob = false;
      this.showListOffres = false;
      this.showListKit = false;
    } else if (listName === 'offre-emploi') {
      this.showListOffres = !this.showListOffres;
      this.showListPocketJob = false;
      this.showListNews = false;
      this.showListKit = false;
    } else if (listName === 'kit-compta') {
      this.showListKit = !this.showListKit;
      this.showListPocketJob = false;
      this.showListNews = false;
      this.showListOffres = false;
     
    } else {
      this.showListPocketJob = false;
      this.showListNews = false;
      this.showListOffres = false;
      this.showListKit = false;
     
    }
  }
}
