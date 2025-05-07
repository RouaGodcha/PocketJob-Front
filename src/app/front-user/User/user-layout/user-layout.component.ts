import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  standalone: false,
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
  //googleMapsApiKey = environment.googleMapsApiKey;

  constructor() { }

  ngOnInit(): void {
    // L'API peut maintenant être utilisée avec votre clé
    //console.log('API Key pour Google Maps :', this.googleMapsApiKey);
  }
}
