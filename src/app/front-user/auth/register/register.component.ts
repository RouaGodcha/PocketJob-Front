import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  days: number[] = [];
  months = [
    { value: 1, label: 'janv' },
    { value: 2, label: 'févr' },
    { value: 3, label: 'mars' },
    { value: 4, label: 'avr' },
    { value: 5, label: 'mai' },
    { value: 6, label: 'juin' },
    { value: 7, label: 'juil' },
    { value: 8, label: 'août' },
    { value: 9, label: 'sept' },
    { value: 10, label: 'oct' },
    { value: 11, label: 'nov' },
    { value: 12, label: 'déc' }
  ];
  years: number[] = [];
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
  constructor() {}
  ngOnInit(): void {
       // Générer les jours
    for (let d = 1; d <= 31; d++) {
      this.days.push(d);
    }

    // Générer les années (ex: 1900 à 2025)
    for (let y = 2025; y >= 1900; y--) {
      this.years.push(y);
    }
  }
  onSubmit() {
    // Traiter les données du formulaire
  }
}
