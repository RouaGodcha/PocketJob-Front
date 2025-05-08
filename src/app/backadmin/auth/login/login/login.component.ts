import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../../environments/environment';
import { LocalStorageService } from '../../../../_services/localstorage.service';
import { AuthService } from '../../../../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isMobile: boolean = false;

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  submitted = false;
  siteUrl = `${environment.siteUrl}`;
  data: any;
  dataId: any;
  role: any;
  permissions: any;
  dataDecrypted: any;
  dataState!: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.titleService.setTitle('PocketJob - Connexion Admin');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.isMobile = window.innerWidth < 768;
  }
  login(): void {
    console.log(this.loginForm.value); // Affiche les valeurs du formulaire pour le débogage
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        const token = res.body.access_token;
        const user = res.body.user;
        const role = user.roles[0];
        this.localstorageService.setAdminToken(token);
        this.localstorageService.setAdminRole(role);
        //this.localstorageService.setAdminId(user.id);
    
        if (role=== 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/home/acceuil']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Identifiants incorrects ou erreur serveur.';
      },
    });
    
  }
  forget() {
    this.router.navigate(['forget'], { replaceUrl: true });
  }
  
  
  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  /**
       * Set authentication errors
       *
       * @param err
       */
  private setErrors(err: HttpErrorResponse) {
    if (err.error) {  // Vérifier que err.error existe
      if (!err.error.success) {
        if (err.status === 422) {
          this.dataState = 'empty';
          const errorData = err.error.error.data;
  
          // Vérifie si les données d'erreur existent avant d'y accéder
          if (errorData && errorData.email) {
            this.loginForm.controls['email'].setErrors({ 'auth': true, 'required': true });
          } else {
            this.loginForm.controls['email'].setErrors({ 'auth': true });
          }
          if (errorData && errorData.password) {
            this.loginForm.controls['password'].setErrors({ 'auth': true, 'required': true });
          } else {
            this.loginForm.controls['password'].setErrors({ 'auth': true });
          }
        }
        if (err.status === 401) {
          if (err.error.error === "email not found" && this.loginForm.controls['email'].value !== "") {
            this.loginForm.controls['email'].setErrors({ 'auth': true });
            this.dataState = "email";
          } else if (err.error.error === "wrong password" && this.loginForm.controls['password'].value !== "") {
            this.loginForm.controls['password'].setErrors({ 'auth': true });
            this.dataState = "password";
          }
        }
      }
    } else {
      // Si err.error est undefined, définir un message d'erreur générique
      this.errorMessage = "Une erreur est survenue, veuillez réessayer.";
    }
  }
  
}
