import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { AuthUserService } from '../../_services/authuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-candidat',
  standalone:false,
  templateUrl: './navbar-candidat.component.html',
  styleUrl: './navbar-candidat.component.scss'
})
export class NavbarCandidatComponent {
  candidat = {
    email: '',
    is_validated: true // ou false
  };

  statusToggleDropdownList = false;

  constructor(private router: Router, private authService: AuthUserService) {}

  /* hethi kif todkhol b esm candidat yetsajl f navbar email mte3ou */
  ngOnInit(): void {
    this.authService.getCandidatProfile().subscribe({
      next: data => this.candidat = data, // 🟢 ça met automatiquement l'email affiché
      error: () => console.warn("Erreur lors du chargement du profil.")
    });
  }
  

  toggleDropdownList(): void {
    this.statusToggleDropdownList = !this.statusToggleDropdownList;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home/homeRegister/inscription']);
  }

  openSetting(): void {
    this.router.navigate(['/dashboard/settings']); // ajuste la route selon ton app
  }
}
