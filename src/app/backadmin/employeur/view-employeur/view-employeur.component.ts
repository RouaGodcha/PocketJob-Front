import { Component } from '@angular/core';
import { EmployerService } from '../../_services/employer.service';
import { ActivatedRoute } from '@angular/router';
import { Employer } from '../employeur.model';

@Component({
  selector: 'app-view-employeur',
  standalone: false,
  templateUrl: './view-employeur.component.html',
  styleUrls: ['./view-employeur.component.scss']
})
export class ViewEmployeurComponent {
  employer: Employer = {} as Employer; // Initialisation vide
  // ou
  
  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService
  ) {}

  ngOnInit() {
    const employerId = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID depuis l'URL
    if (employerId) {
      this.employerService.getEmployerById(employerId).subscribe(
        (data) => {
          this.employer = data;  // Stocke les données de l'employeur
        },
        (error) => {
          console.error('Erreur lors du chargement des détails de l\'employeur', error);
        }
      );
    }
  }

  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }
}
