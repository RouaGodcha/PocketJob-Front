import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { LocalStorageService } from '../../../_services/localstorage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';

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
    private authService: AuthService,
    private localStorageService: LocalStorageService,
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
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        const token = res.body.token;
        const role = res.body.roles[0]?.name || 'user';

         // Déchiffrer le token pour récupérer l'ID utilisateur
         const decodedToken: any = jwtDecode(token);
         const userId = decodedToken.sub;
 
         // Stocker dans le localStorage
         this.localStorageService.setAdminToken(token);
         this.localStorageService.setAdminRole(role);
         this.localStorageService.setAdminId(userId);
 
         // Rediriger selon le rôle
         this.router.navigate([role === 'user' ? 'user/dashboard' : 'admin/dashboard']);
       },
       error: (err: HttpErrorResponse) => {
         this.errorMessage = 'Échec de la connexion. Vérifiez vos informations.';
         this.submitted = false;
       }
     });
    }
  



}
