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
  errorMessage = null;
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
      'backadmin');
  }
  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.body.roles[0].name == 'admin' || 'superadmin') {
          this.data = res.body.token;
          this.dataId = res.body.id;
          this.role = res.body.roles[0].name;
          this.dataDecrypted = jwtDecode(this.data);
          this.localstorageService.setAdminToken(this.data);
          this.localstorageService.setAdminRole(this.role);
          this.localstorageService.setAdminId((parseInt(this.dataDecrypted.sub) % 10) + '');
          this.router.navigate(['admin/dashboard']);
          this.errorMessage = null;
          this.submitted = false;
        }
       
      },
        (err: HttpErrorResponse) => {
          this.errorMessage != true;
          this.submitted=false;
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
    if (!err.error.success) {
      if (err.status === 422) {
        this.dataState = 'empty';
        const errorData = err.error.error.data;
        if (errorData.email) {
          this.loginForm.controls['email'].setErrors({ 'auth': true, 'required': true });
        } else {
          this.loginForm.controls['email'].setErrors({ 'auth': true });
        }
        if (errorData.password) {
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
  }
  forget() {
    this.router.navigate(['forget'], { replaceUrl: true })
  }

}
