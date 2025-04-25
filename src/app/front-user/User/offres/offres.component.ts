import { Component, OnInit } from '@angular/core';
import { OffresDetailsService } from '../../_services/offres-details.service';
import { formatDateFr } from './utils/date-utils';

@Component({
  selector: 'app-offres',
  standalone: false,
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.scss'
})
export class OffresComponent implements OnInit {
  offres: any[] = [];
  filteredOffres: any[] = [];
  sortAsc: boolean = true;
  hoveredOffre: number | null = null;
  // Filtres
  startDate = '';
  endDate = '';
  today = new Date().toISOString().split('T')[0];
  showError = false;
  selectedPeriode: 'semaine' | 'semaineProchaine' | null = null;

  dateDropdownOpen = false;
  typeEmploiDropdownOpen = false;
  dureeDropdownOpen = false;
  autreDropdownOpen = false;

  selectedTypes: string[] = [];
  selectedDurees: string[] = [];
  selectedAutres: string[] = [];

  typeEmploisDisponibles: string[] = [
    "Personnel d'accueil",
    "Aides à l'événement",
    "Assistants étudiants",
    "chercheurs de marché",
    "assistants de vente au détail",
    "Personnel de service",
    "promoteur"
  ];

  dureesDisponibles: string[] = [
    "1 jour", "2-3 jours", "4 à 7 jours", "plus de 7 jours"
  ];

  autresDisponibles: string[] = [
    "Grandes chances de réservation", "Emplois de week-end"
  ];

  constructor(private offresDetailsService: OffresDetailsService) {}

  ngOnInit(): void {
    this.offresDetailsService.getFakeOffres().subscribe(data => {
      this.offres = data.map(offre => ({
        ...offre,
        dateFormatee: formatDateFr(offre.date),
        dateIso: new Date(offre.date).toISOString().split('T')[0]
      }));
      this.filteredOffres = [...this.offres];
    });
  }

  // pour delet offre!*
  deleteOffre(id: number): void {
    // 🔁 Appel backend réel
    this.offresDetailsService.deleteOffre(id).subscribe({
      next: () => {
        // 🧹 Mise à jour locale après suppression réussie
        this.offres = this.offres.filter(o => o.id !== id);
        this.filteredOffres = this.filteredOffres.filter(o => o.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });
  
    // 🧪 Variante locale seule (à commenter si back actif)
    /*
    this.offres = this.offres.filter(o => o.id !== id);
    this.filteredOffres = this.filteredOffres.filter(o => o.id !== id);
    */
  }
  
  // delete partie back

  deleteOffres(id: number): void {
    this.offresDetailsService.deleteOffre(id).subscribe({
      next: () => {
        this.filteredOffres = this.filteredOffres.filter(o => o.id !== id);
        this.offres = this.offres.filter(o => o.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });
  }

  
  // ⬇️ Dropdown management
  toggleDateDropdown(): void {
    this.dateDropdownOpen = !this.dateDropdownOpen;
    if (this.dateDropdownOpen) {
      this.typeEmploiDropdownOpen = false;
      this.dureeDropdownOpen = false;
      this.autreDropdownOpen = false;
    }
  }

  toggleTypeDropdown(): void {
    this.typeEmploiDropdownOpen = !this.typeEmploiDropdownOpen;
    if (this.typeEmploiDropdownOpen) {
      this.dateDropdownOpen = false;
      this.dureeDropdownOpen = false;
      this.autreDropdownOpen = false;
    }
  }

  toggleDureeDropdown(): void {
    this.dureeDropdownOpen = !this.dureeDropdownOpen;
    if (this.dureeDropdownOpen) {
      this.dateDropdownOpen = false;
      this.typeEmploiDropdownOpen = false;
      this.autreDropdownOpen = false;
    }
  }

  toggleAutreDropdown(): void {
    this.autreDropdownOpen = !this.autreDropdownOpen;
    if (this.autreDropdownOpen) {
      this.dateDropdownOpen = false;
      this.typeEmploiDropdownOpen = false;
      this.dureeDropdownOpen = false;
    }
  }

  // 📅 Filtres Date
  resetDateFilter(): void {
    this.startDate = '';
    this.endDate = '';
    this.showError = false;
    this.filteredOffres = [...this.offres];
    this.dateDropdownOpen = false;
  }

  applyDateFilter(): void {
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    if ((start && start < now) || (end && end < now)) {
      this.showError = true;
      return;
    }

    const startTime = start ? start.getTime() : -Infinity;
    const endTime = end ? end.getTime() : Infinity;

    this.filteredOffres = this.offres.filter(o => {
      const d = new Date(o.dateIso).getTime();
      return d >= startTime && d <= endTime;
    });

    this.dateDropdownOpen = false;
  }

  // 🎯 Période (Semaine / Semaine Prochaine)
  applyPeriodeFilter(mode: 'semaine' | 'semaineProchaine') {
    const today = new Date();
    const currentDay = today.getDay();
    const diffToMonday = (currentDay + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    let start: Date;
    let end: Date;

    if (mode === 'semaine') {
      start = new Date(monday);
      end = new Date(monday);
      end.setDate(start.getDate() + 6);
    } else {
      start = new Date(monday);
      start.setDate(start.getDate() + 7);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    }

    this.filteredOffres = this.offres.filter(o => {
      const d = new Date(o.dateIso);
      return d >= start && d <= end;
    });

    this.selectedPeriode = mode;
  }

  // 🧩 Type
  isTypeChecked(type: string): boolean {
    return this.selectedTypes.includes(type);
  }

  toggleTypeSelection(type: string): void {
    this.selectedTypes = this.selectedTypes.includes(type)
      ? this.selectedTypes.filter(t => t !== type)
      : [...this.selectedTypes, type];
  }

  resetTypeFilter(): void {
    this.selectedTypes = [];
    this.filteredOffres = [...this.offres];
    this.typeEmploiDropdownOpen = false;
  }

  applyTypeFilter(): void {
    this.filteredOffres = this.offres.filter(offre => {
      const date = new Date(offre.dateIso).getTime();
      const startTime = this.startDate ? new Date(this.startDate).getTime() : -Infinity;
      const endTime = this.endDate ? new Date(this.endDate).getTime() : Infinity;

      const matchDate = date >= startTime && date <= endTime;
      const matchType = this.selectedTypes.length === 0 || this.selectedTypes.includes(offre.titre);

      return matchDate && matchType;
    });

    this.typeEmploiDropdownOpen = false;
  }

  // 🕒 Durée
  isDureeChecked(duree: string): boolean {
    return this.selectedDurees.includes(duree);
  }

  toggleDureeSelection(duree: string): void {
    this.selectedDurees = this.selectedDurees.includes(duree)
      ? this.selectedDurees.filter(d => d !== duree)
      : [...this.selectedDurees, duree];
  }

  resetDureeFilter(): void {
    this.selectedDurees = [];
    this.filteredOffres = [...this.offres];
    this.dureeDropdownOpen = false;
  }

  applyDureeFilter(): void {
    this.filteredOffres = this.offres.filter(offre => {
      const date = new Date(offre.dateIso).getTime();
      const startTime = this.startDate ? new Date(this.startDate).getTime() : -Infinity;
      const endTime = this.endDate ? new Date(this.endDate).getTime() : Infinity;

      const matchDate = date >= startTime && date <= endTime;
      const matchType = this.selectedTypes.length === 0 || this.selectedTypes.includes(offre.titre);
      const matchDuree = this.selectedDurees.length === 0 || this.selectedDurees.includes(this.getDureeCategory(offre.duree || 1));

      return matchDate && matchType && matchDuree;
    });

    this.dureeDropdownOpen = false;
  }

  getDureeCategory(duree: number): string {
    if (duree === 1) return "1 jour";
    if (duree <= 3) return "2-3 jours";
    if (duree <= 7) return "4 à 7 jours";
    return "plus de 7 jours";
  }

  // ✅ Autre
  isAutreChecked(option: string): boolean {
    return this.selectedAutres.includes(option);
  }

  toggleAutreSelection(option: string): void {
    this.selectedAutres = this.selectedAutres.includes(option)
      ? this.selectedAutres.filter(a => a !== option)
      : [...this.selectedAutres, option];
  }

  resetAutreFilter(): void {
    this.selectedAutres = [];
    this.filteredOffres = [...this.offres];
    this.autreDropdownOpen = false;
  }

  applyAutreFilter(): void {
    this.filteredOffres = this.offres.filter(offre => {
      const date = new Date(offre.dateIso).getTime();
      const startTime = this.startDate ? new Date(this.startDate).getTime() : -Infinity;
      const endTime = this.endDate ? new Date(this.endDate).getTime() : Infinity;

      const matchDate = date >= startTime && date <= endTime;
      const matchType = this.selectedTypes.length === 0 || this.selectedTypes.includes(offre.titre);
      const matchDuree = this.selectedDurees.length === 0 || this.selectedDurees.includes(this.getDureeCategory(offre.duree || 1));

      const matchAutre =
        this.selectedAutres.length === 0 ||
        this.selectedAutres.every(val => {
          if (val === "Grandes chances de réservation") return offre.grandeChance === true;
          if (val === "Emplois de week-end") return offre.weekend === true;
          return true;
        });

      return matchDate && matchType && matchDuree && matchAutre;
    });

    this.autreDropdownOpen = false;
  }

  // ⏫ Tri par date
  sortByDate(): void {
    this.filteredOffres.sort((a, b) => {
      const dateA = new Date(a.dateIso).getTime();
      const dateB = new Date(b.dateIso).getTime();
      return this.sortAsc ? dateA - dateB : dateB - dateA;
    });
    this.sortAsc = !this.sortAsc;
  }
}
