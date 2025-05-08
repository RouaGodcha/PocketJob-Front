import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthEmployerService } from '../../front-employer/service/auth-employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  submitted = false;
  currentStep = 1;
  employerForm: FormGroup;
  mapUrl: string = ''; // Initialize with an empty string instead of undefined
  private googleApiKey = 'TA_CLE_API'; // Replace with your actual API key
  form: any;

  constructor(private fb: FormBuilder,
    private authEmployerService: AuthEmployerService,
    private router : Router 
  ) {
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

  ngOnInit(): void {
    // Map initiale
    this.updateMap();
  }
  nextStep() {
    if (this.employerForm.valid || this.forceStepValidation(this.currentStep)) {
      this.currentStep++;
    } else {
      this.submitted = true;
    }
  }
  

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  

  onSubmit(): void {
    this.submitted = true;
    if (this.employerForm.invalid) return;
    const formData = new FormData(); // ✅ tu dois déclarer formData ici
    formData.append('name', this.employerForm.get('nomEntreprise')?.value);
    formData.append('email', this.employerForm.get('email')?.value); // ✅ email réel du formulaire
    formData.append('password', this.employerForm.get('password')?.value);
    formData.append('password_confirmation', this.employerForm.get('password')?.value);
    formData.append('role', 'employer'); // ✅ rôle à envoyer au backend
    this.authEmployerService.registerEmployer(formData).subscribe({
      next: (res) => {
        console.log('✅ Employeur inscrit automatiquement :', res);
        this.router.navigate(['/Frontemployer/dashboardEmployer']);
      },
      error: (err) => {
        console.error('❌ Erreur d’inscription auto', err);
      }
    });
  }
  
  
  // Mise à jour de la carte avec l'adresse de l'entreprise
  updateMap() {
    const adresse = this.employerForm.get('adresseEntreprise')?.value;
    this.mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(adresse)}&output=embed`;
  }
  
  forceStepValidation(step: number) {
    // Permet de contrôler les validations par étape
    if (step === 1) {
      return this.employerForm.get('nomEntreprise')?.valid && this.employerForm.get('adresseEntreprise')?.valid && this.employerForm.get('secteur')?.valid;
    }
    if (step === 2) {
      return this.employerForm.get('nomResponsable')?.valid && this.employerForm.get('email')?.valid && this.employerForm.get('telephone')?.valid && this.employerForm.get('password')?.valid;
    }
    return true;
  }
}
