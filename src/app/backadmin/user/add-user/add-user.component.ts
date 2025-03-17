import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import {  UsersService } from "../../_services/users.service";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  standalone:false,
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() diplomas: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  addUserForm: UntypedFormGroup = this.generateForm();
  attemptSubmission: boolean = false;
  showingPassword: boolean = false;
  newPassword = "";
  passwordLenght = 12;
  oldPasswordInvalid: boolean = false;
  emailExists: boolean = false;
  showSuccess: boolean = false;
  loading: boolean = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UsersService,
    public translate: TranslateService
  ) { }
  generateForm() {
    return this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [this.confirmPassword(), Validators.required]],
      diploma_id: ['', Validators.required],
    });
  }
  cancel() {
    this.showSuccess = false;
    this.addUserForm = this.generateForm();
    this.attemptSubmission = false;
    this.close.emit();
  }
  generatePassword() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var newPassword = '';
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += possible[Math.floor(Math.random() * possible.length)];
    }
    this.newPassword = newPassword;
    if (this.newPassword) {
      this.addUserForm.patchValue({
        password: this.newPassword,
        password_confirmation: this.newPassword
      })
    }
  }
  confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var password_confirm = control.value
      try {
        var password = this.addUserForm?.get('password')?.value
      } catch (err) {
        console.error(err)
      }
      if (password === password_confirm) return null
      return { password_mismatch: true }
    }
  }
  password() {
    this.showingPassword = !this.showingPassword;
  }
  attemptAddUser(event: any) {
    this.attemptSubmission = true;
    if (this.addUserForm.valid) {
      let form = this.addUserForm.value;
      let roles = [];
      roles.push("student");
      form.roles = roles;
      this.loading = true
      this.userService.storeUser(form).subscribe((res: any) => {
        if (res.status === 200) {
          if (res.body.result === 'success') {
            this.show = false;
            Swal.fire({
              text: this.translate.instant('USERS.USER_ADDED'),
              icon: 'success',
              showCancelButton: false,
              customClass: {
                confirmButton: 'btn-primary',
              }
            }).then(() => {
              this.addUserForm = this.generateForm();
              this.showSuccess = false;
              this.loading = false;
              this.success.emit();
              this.attemptSubmission = false;
            })
          }
        }
      },
        (res: any) => {
          this.loading = false
          if (res.status === 422) {
            if (res.error.error.data.email) { this.emailExists = true }
          }
        }
      )
    }
  }
}
