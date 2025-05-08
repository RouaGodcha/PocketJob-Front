import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { LocalStorageService } from '../../../_services/localstorage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';
import { AuthCandidatService } from '../../User/serviceAuth/auth-candidat.service';
import { LocalStorageCandidatService } from '../../User/serviceAuth/local-storage-candidat.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  submitted = false;

  constructor (
    private fb: FormBuilder,
    private AuthCandidatService: AuthCandidatService,
    private LocalStorageCandidatService: LocalStorageCandidatService,
    private router: Router,
    private titleService: Title
   ){
    this.titleService.setTitle('Connexion - PocketJob');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

   login(): void {
   console.log(this.loginForm.value); // Affiche les valeurs du formulaire pour le débogage
   this.submitted = true;
   if (this.loginForm.invalid) return;
 
   this.AuthCandidatService.loginCandidat(this.loginForm.value).subscribe({
    next: (res: any) => {
      const token = res.access_token;
      const user = res.user;
      const role = user.roles[0];
  
      this.LocalStorageCandidatService.setCandidatToken(token);
      this.LocalStorageCandidatService.setCandidatRole(role);
      this.LocalStorageCandidatService.setCandidatId(user.id);
  
      // ⚠️ attend un petit peu avant de router
      setTimeout(() => {
        if (role === 'candidate') {
          this.router.navigate(['/home/mon-compte/dashboardcandidat']);
        } else if (role === 'employer') {
          this.router.navigate(['/Frontemployer/dashboardEmployer']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        }
      }, 100);
      
    },
    error: () => {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  });
   }  
  forget() {
    this.router.navigate(['forget']);
  }
  



}
