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
  showListUsers: boolean = false;  // Nouvelle variable pour gérer les filtres utilisateurs
  showListCandidature : boolean = false;
  showListRendezVous: boolean = false;
  showListPublicite: boolean = false;
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
    // this.currentFilter();
  }

  clickEvent(): void {
    this.status = !this.status;
  }

  overlayStatusFct(): void {
    this.overlayStatus = false;
    this.showListPocketJob = false;
    this.showListNews = false;
    this.showListOffres = false;
    this.showListKit = false;
    this.showListUsers = false; 
    this.showListCandidature =false; 
    this.showListRendezVous=false// Fermer les filtres utilisateurs
    this.showListPublicite = false;
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

  showList(listName: any) {
    if (listName === 'pocketjob') {
      this.showListPocketJob = !this.showListPocketJob;
      this.showListNews = false;
      this.showListOffres = false;
      this.showListKit = false;
      this.showListPublicite = false;
      this.showListUsers = false;
      this.showListRendezVous=false;
      this.showListCandidature =false; 
    } else if (listName === 'news') {
      this.showListNews = !this.showListNews;
      this.showListPocketJob = false;
      this.showListOffres = false;
      this.showListKit = false;
      this.showListPublicite = false;
      this.showListUsers = false;
      this.showListRendezVous=false;
      this.showListCandidature =false; 
    } else if (listName === 'offre-emploi') {
      this.showListOffres = !this.showListOffres;
      this.showListPocketJob = false;
      this.showListNews = false;
      this.showListKit = false;
      this.showListPublicite = false;
      this.showListRendezVous=false;
      this.showListUsers = false;
      this.showListCandidature =false; 
    } else if (listName === 'users') {
      this.showListUsers = !this.showListUsers;
      this.showListPocketJob = false;
      this.showListNews = false;
      this.showListRendezVous=false;
      this.showListOffres = false;
      this.showListPublicite = false;
      this.showListKit = false;
      this.showListCandidature =false; 
    } else {
      this.showListPocketJob = false;
      this.showListNews = false;
      this.showListRendezVous=false;
      this.showListPublicite = false;
      this.showListOffres = false;
      this.showListKit = false;
      this.showListUsers = false;
      this.showListCandidature =false; 
    }
  }
}
