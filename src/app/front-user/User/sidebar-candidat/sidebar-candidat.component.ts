import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-candidat',
  standalone: false,
  templateUrl: './sidebar-candidat.component.html',
  styleUrl: './sidebar-candidat.component.scss'
})
export class SidebarCandidatComponent {
  isSidebarClosed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home/loginUser']);
  }
}
