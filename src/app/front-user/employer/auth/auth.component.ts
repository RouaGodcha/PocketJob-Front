import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  submitted = false;
  currentStep = 1;
  employerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employerForm = this.fb.group({
      // Étape 1 : Entreprise
      nomEntreprise: ['', Validators.required],
      adresseEntreprise: ['', Validators.required],
      secteur: ['', Validators.required],

      // Étape 2 : Responsable
      nomResponsable: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      // Étape 3 : Disponibilité + RGPD
      disponibilite: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  submit() {
    this.submitted = true;
    if (this.employerForm.valid) {
      console.log('Formulaire envoyé ✅', this.employerForm.value);
      // ici tu peux envoyer au backend via service HTTP
    } else {
      this.employerForm.markAllAsTouched();
      console.warn('Formulaire invalide ❌');
    }
  }
}
