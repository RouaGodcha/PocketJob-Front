import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {
  offres = [
    {
      id: 1,
      titre: 'Serveur pour événement',
      description: 'Recherche serveur pour soirée entreprise à Paris.',
      ville: 'Sousse'
    },
    {
      id: 2,
      titre: 'Manutentionnaire',
      description: 'Déchargement de camions pour événement sportif.',
      ville: 'Tunis'
    }
  ];
  

  constructor() {}

  ngOnInit(): void {
    // plus tard tu pourras charger depuis ton service Angular ici
  }
}
