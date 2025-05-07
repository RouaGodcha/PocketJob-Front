import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../_services/localstorage.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  statusToggleDropdownList: Boolean = false;
  mobileMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private localstorageService: LocalStorageService
  ) {}
  logout() {
    this.localstorageService.clear();
    this.router.navigate(['/admin/login']);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  openSetting() {
    this.router.navigate(['/admin/configurations']);
    this.toggleDropdownList();
  }
    
  toggleDropdownList() {
    this.statusToggleDropdownList = !this.statusToggleDropdownList;
  }
}