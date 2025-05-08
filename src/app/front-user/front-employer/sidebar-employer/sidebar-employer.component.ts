import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-sidebar-employer',
  standalone: false,
  templateUrl: './sidebar-employer.component.html',
  styleUrl: './sidebar-employer.component.scss'
})
export class SidebarEmployerComponent {
  sidebarOpen = false;
  isLightMode = false;
   
  topEmployeurs =[
    {nom: 'Employeur', image: '/profile.jpg'}
  ];
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  // Pour tester le mode clair/foncé (tu peux ajouter un bouton pour le toggle)
  toggleTheme() {
    this.isLightMode = !this.isLightMode;
  }
}
