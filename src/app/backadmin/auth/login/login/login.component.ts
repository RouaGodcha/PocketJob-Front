import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  loginForm!: UntypedFormGroup;

  siteUrl = `${environment.siteUrl}`;

  data: any;
  dataId: any;
  role: any;
  permissions: any;
  errorMessage: string | null = null;
  submitted = false;
  dataDecrypted: any;
  dataState!: any;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.initLoginForm();
    this.titleService.setTitle(
      'PocketJob');
  }
  login(): void {
    console.log(this.loginForm.value); // Affiche les valeurs du formulaire pour le débogage
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.body.user.role === 'admin') {
          this.data = res.body.token;
          this.dataId = res.body.id;
          this.role = res.body.roles[0].name; // Récupérer le rôle de l'utilisateur
          this.dataDecrypted = jwtDecode(this.data); // Décrypter le token pour récupérer les informations
          this.localstorageService.setAdminToken(this.data); // Sauvegarder le token
          this.localstorageService.setAdminRole(this.role); // Sauvegarder le rôle
          this.localstorageService.setAdminId((parseInt(this.dataDecrypted.sub) % 10) + ''); // Sauvegarder l'ID utilisateur
          this.router.navigate(['/dashboard']); // Rediriger vers le dashboard
          this.errorMessage = null;
          this.submitted = false;
        } else {
          window.location.href = this.siteUrl; // Rediriger ailleurs si ce n'est pas un administrateur
        }
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = this.errorMessage ? null : 'Une erreur s\'est produite';
        this.submitted = false;
        this.setErrors(err);
      });
    }
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
  
  forget() {
    this.router.navigate(['forget'], { replaceUrl: true })
  }

}
