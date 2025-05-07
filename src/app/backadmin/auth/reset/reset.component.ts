import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: false,
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent  {
  isMobile: boolean = false;

resetPasswordForm!: UntypedFormGroup;
data: any;
dataId: any;
role: any;
permissions: any;
errorMessage = null;
submitted = false;
dataDecrypted: any;
constructor(
  private fb: UntypedFormBuilder,
  private router: Router,
  private titleService: Title,
  public authService: AuthService
) { }
ngOnInit(): void {
  this.initResetPasswordForm();
  this.titleService.setTitle(
    'backadmin');
    this.isMobile = window.innerWidth < 768;
}
resetPassword(): void {
  const body = this.resetPasswordForm.value;
  this.submitted = true;
  if (this.resetPasswordForm.valid) {
    this.authService.resetPassword(body).subscribe((res: any) => {
      if (res.status === 200) {
        this.router.navigate(['admin/login'], { replaceUrl: true });
      }
      this.errorMessage = null;
      this.submitted = false;
    },
      (err: HttpErrorResponse) => {
        this.errorMessage != true;
        this.submitted = false;
        this.setErrors(err);
      });
  }
}
/*** Init login form*/
private initResetPasswordForm() {
  this.resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    code: ['', [Validators.required, Validators.pattern("^[0-9]{4}\\-[0-9]{3}\\-[0-9]{4}$")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required]],
  }, { validators: this.checkPasswords });
}
checkPasswords: Validators = (group: AbstractControl): ValidationErrors | null => {
  let pass = group?.get('password')?.value;
  let confirmPass = group?.get('password_confirmation')?.value
  return pass === confirmPass ? null : { notSame: true }
}
get f() {
  return this.resetPasswordForm.controls;
}
private setErrors(err: HttpErrorResponse) {
  const emailErrors = this.resetPasswordForm.controls['email'].errors || {};
  const codeErrors = this.resetPasswordForm.controls['code'].errors || {};
  if (!err.error.success) {
    emailErrors['auth'] = (err.error.errors.email[0] === "The selected email is invalid.");
    codeErrors['auth'] = (err.error.errors.code[0] === "The selected code is invalid.");
    this.resetPasswordForm.controls['email'].setErrors(emailErrors);
    this.resetPasswordForm.controls['code'].setErrors(codeErrors);
  }
}
forget() {
  this.router.navigate(['forget'], { replaceUrl: true })
}
}

