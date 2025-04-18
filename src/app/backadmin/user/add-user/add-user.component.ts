import { Component,  EventEmitter,  Input,  OnInit, Output, ViewChild} from '@angular/core';
import { UsersService } from '../../_services/users.service';
import {  AbstractControl, FormGroup, UntypedFormBuilder ,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  standalone:false,
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() diplomas: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();

  
  addUserForm!: FormGroup ;
  attemptSubmission: boolean = false;
  showingPassword: boolean = false;
  newPassword = "";
  passwordLenght = 12;
  oldPasswordInvalid: boolean = false;
  emailExists: boolean = false;
  showSuccess: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UsersService,
  ) { }


 
  ngOnInit(): void {
    console.log('Données du formulaire:', this.addUserForm.value);
    this.generateForm();
      
  }


  /**
   * Initialise le formulaire avec les validations nécessaires
   */
  generateForm() {
    this.addUserForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', Validators.required],
      diplome: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      mdp: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]
      ],
      confirmmdp: ['', [this.confirmPassword() , Validators.required]]
    });
  }

  cancel() {
    this.showSuccess = false;
   this.generateForm();
    this.attemptSubmission = false;
    this.close.emit();
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
  generatePassword(){

  }

  password() {
    this.showingPassword = !this.showingPassword;
  }



/**
   * Ajoute un utilisateur en soumettant le formulaire
   */
attemptAddUser() {
  this.attemptSubmission = true;

  if (this.addUserForm.valid) {
     // Afficher les données du formulaire dans la console
     console.log('Données du formulaire:', this.addUserForm.value);

    const formData = this.addUserForm.value;
    formData.roles = ['candidat']; // Ajoute le rôle

    this.loading = true;
    this.userService.storeUser(formData).subscribe(
      (res: any) => {
        if (res.status === 200 && res.body.result === 'success') {
          Swal.fire({
            text: 'Utilisateur ajouté avec succès !',
            icon: 'success',
            showCancelButton: false,
            customClass: { confirmButton: 'btn-primary' }
          }).then(() => {
            this.addUserForm.reset(); // Réinitialiser le formulaire
            this.loading = false;
            this.attemptSubmission = false;
          });
        }
      },
      (err: any) => {
        this.loading = false;
        if (err.status === 422 && err.error.error.data.email) {
          Swal.fire('Erreur', 'Email déjà utilisé', 'error');
        }
      }
    );
  }
}

}

 