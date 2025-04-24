import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../../../_services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone:false,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  currentStep = 1;
  reservationForm!: FormGroup;
  showDateError = false;
  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      // Étape 1
      nomMission: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      emplacement: ['', Validators.required],
      horaires: ['', Validators.required],

      // Étape 2
      nombrePersonnes: [1, [Validators.required, Validators.min(1)]],
      qualifications: ['', Validators.required],

      // Étape 3
      nomEntreprise: ['', Validators.required],
      nomContact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
    });
  }
  
  
  nextStep(): void {
    if (this.currentStep === 1) {
      const dateDebut = new Date(this.reservationForm.get('dateDebut')?.value);
      const dateFin = new Date(this.reservationForm.get('dateFin')?.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (dateDebut < today) {
        this.showDateError = true;
        return;
      }
  
      if (dateFin < dateDebut) {
        alert('La date de fin doit être postérieure à la date de début.');
        return;
      }
    }
  
    if (this.isStepValid(this.currentStep)) {
      this.currentStep++;
    }
  }
  closePopup(): void {
    this.showDateError = false;
  }
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(step: number): boolean {
    const controlsByStep: { [key: number]: string[] } = {
      1: ['nomMission', 'dateDebut', 'dateFin', 'emplacement', 'horaires'],
      2: ['nombrePersonnes', 'qualifications'],
      3: ['nomEntreprise', 'nomContact', 'email', 'telephone'],
    };
  
    const controls = controlsByStep[step] || [];
  
    return controls.every(name => this.reservationForm.get(name)?.valid === true);
  }
  

  submit(): void {
    if (this.reservationForm.valid) {
      this.reservationService.enregistrerMission(this.reservationForm.value).subscribe({
        next: () => this.router.navigate(['/reservation/confirmation']),
        error: err => console.error('Erreur de soumission :', err)
      });
    }
  }
}
