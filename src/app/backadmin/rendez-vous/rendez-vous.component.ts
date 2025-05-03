import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../_services/rendez-vous.service';
import { RendezVous } from './rendez-vous.model';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-rendez-vous',
  standalone:false,
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss'],
  providers: [DialogService]
})
export class RendezVousComponent implements OnInit {
  // Liste de tous les rendez-vous
  rendezVousList: RendezVous[] = [];
  
  // Liste filtrée pour l'affichage
  filteredRendezVous: RendezVous[] = [];

  // Filtres de recherche
  filters = { entreprise: '', candidat: '', statut: '', date: '' };
  selectedDate: Date | null = null;

  // Pour l'édition
  displayEditModal = false;
  editingRdv: RendezVous | null = null;

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  /**
   * Charger la liste des rendez-vous depuis le service (fake ou API réelle)
   */
  loadRendezVous() {
    // Utiliser le fake pour tester
    this.rendezVousService.getAllRendezVousFake().subscribe(data => {
      this.rendezVousList = data;
      this.filteredRendezVous = [...data];
    });

    // Pour utiliser le vrai API, décommente ici :
    /*
    this.rendezVousService.getAllRendezVous().subscribe(data => {
      this.rendezVousList = data;
      this.filteredRendezVous = [...data];
    });
    */
  }

  /**
   * Appliquer les filtres sur la liste
   */
  applyFilters() {
    this.filteredRendezVous = this.rendezVousList.filter(rdv => {
      return (!this.filters.entreprise || rdv.entreprise.includes(this.filters.entreprise)) &&
             (!this.filters.candidat || rdv.candidat.includes(this.filters.candidat)) &&
             (!this.filters.statut || rdv.statut === this.filters.statut) &&
             (!this.filters.date || rdv.date === this.filters.date);
    });
  }

  /**
   * Ouvrir le modal pour éditer un rendez-vous
   */
  editRendezVous(rdv: RendezVous) {
    this.editingRdv = { ...rdv }; // On clone pour éviter de modifier directement
    this.displayEditModal = true;
  }

  /**
   * Sauvegarder les modifications
   */
  saveEditedRendezVous() {
    if (this.editingRdv) {
      this.rendezVousService.updateRendezVous(this.editingRdv).subscribe(updated => {
        const index = this.rendezVousList.findIndex(r => r.id === updated.id);
        if (index !== -1) {
          this.rendezVousList[index] = updated;
          this.applyFilters();
        }
        this.displayEditModal = false;
      });
    }
  }

  /**
   * Annuler l'édition
   */
  cancelEdit() {
    this.displayEditModal = false;
  }

  /**
   * Annuler un rendez-vous (statut changé à "annulé")
   */
  cancelRendezVous(rdv: RendezVous) {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      this.rendezVousService.cancelRendezVous(rdv.id).subscribe(() => {
        rdv.statut = 'annulé';
        this.applyFilters();
      });
    }
  }

  /**
   * Lorsqu'on sélectionne une date
   */
  onDateSelect(event: any) {
    if (this.selectedDate) {
      const selectedStr = this.selectedDate.toISOString().split('T')[0];
      this.filters.date = selectedStr;
      this.applyFilters();
    }
  }
}
