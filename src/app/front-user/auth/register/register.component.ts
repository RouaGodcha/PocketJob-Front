import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../_services/authuser.service';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  selectedFile: File | null = null;
  currentStep = 1;
  submitted = false;
  constructor(private fb: FormBuilder, private AuthuserService: AuthUserService) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      genre: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  matchPassword(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  nextStep() {
    this.submitted = true;
  
    const step1Controls = ['prenom', 'nom', 'dateNaissance', 'genre', 'adresse', 'telephone', 'email'];
    const step2Controls = ['password', 'confirmPassword'];
  
    const controlsToCheck = this.currentStep === 1 ? step1Controls : step2Controls;
    const isValid = controlsToCheck.every(control => !this.formRegister.get(control)?.invalid);
  
    if (isValid) {
      this.submitted = false;
      this.currentStep++;
    }
  }

  previousStep() {
    this.currentStep--;
  }

  isStepValid(step: number): boolean {
    const stepFields: { [key: number]: string[] } = {
      1: ['prenom', 'nom', 'dateNaissance', 'genre', 'adresse', 'telephone', 'email'],
      2: ['password', 'confirmPassword'],
    };
    const controls = stepFields[step] || [];
    return controls.every(field => this.formRegister.get(field)?.valid);
  }

  onSubmit(): void {
    if (this.formRegister.valid && this.selectedFile) {
      const formData = new FormData();
      Object.entries(this.formRegister.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('cv', this.selectedFile);

      this.AuthuserService.registerCandidat(formData).subscribe({
        next: res => console.log('Candidat inscrit avec succès', res),
        error: err => console.error('Erreur', err),
      });
      console.log(this.formRegister.value)
    }
  }
}
