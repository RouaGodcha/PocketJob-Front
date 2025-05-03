import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-employer',
  standalone: false,
  templateUrl: './navbar-employer.component.html',
  styleUrl: './navbar-employer.component.scss'
})
export class NavbarEmployerComponent {
  employerName: string = 'Entreprise ABC';
  employerAddress: string = 'Tunis, Tunisie';
  dropdownOpen: boolean = false;

  toggleDropdownList() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    console.log('Déconnexion');
    // Ajouter logique de déconnexion ici
  }

  openSetting() {
    console.log('Open paramètres');
    // Ajouter navigation ou modal
  }
}
