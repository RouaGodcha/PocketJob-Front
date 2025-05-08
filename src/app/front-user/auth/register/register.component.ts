import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCandidatService } from '../../User/serviceAuth/auth-candidat.service';
import { Router } from '@angular/router';

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
  constructor(
    private fb: FormBuilder,
     private AuthCandidatService: AuthCandidatService,
    private router:Router ) {}

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
    const fakeEmail = 'auto_' + Date.now() + '@test.com';
  
    const formData = new FormData();
    formData.append('name', 'Test Auto');
    formData.append('email', fakeEmail);
    formData.append('password', 'password123');
    formData.append('password_confirmation', 'password123');
  
    this.AuthCandidatService.registerCandidat(formData).subscribe({
      next: res => {
        console.log('✅ Candidat inscrit automatiquement :', res);
        this.router.navigate(['/home/mon-compte/dashboardcandidat']);
      },
      
      error: err => console.error('❌ Erreur d’inscription auto', err),
    });
  }
  
}
