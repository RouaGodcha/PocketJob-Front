import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '../../_services/employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-employer',
  standalone : false,
  templateUrl: './update-employer.component.html',
  styleUrls: ['./update-employer.component.scss']
})
export class UpdateEmployerComponent {

  @Input() selectedEmployer: any;
  UpdateEmployer: boolean = true;

  employerForm: FormGroup;
  isSubmitted = false;
  loading = false;
  success = false;
  successMsg = '';
  overlayStatus = false;

  imageUrl: any = null;
  selectedFile: File | null = null;

  allStatus = [
    { name: 'Actif', value: 'actif' },
    { name: 'Inactif', value: 'inactif' }
  ];

  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService,
    private router: Router
  ) {
    this.employerForm = this.fb.group({
      lastname: ['', Validators.required],
      domaine: ['', Validators.required],
      typeProfessionnel: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.initForm();
    console.log('selectedEmployer:', this.selectedEmployer);
    if (this.selectedEmployer) {
      this.patchFormData();
    } else {
      console.error('Aucun employeur sélectionné');
    }
  }

  initForm() {
   this.employerForm = this.fb.group({
      lastname: [null, Validators.required],
      domaine: [null, Validators.required],
      typeProfessionnel: [null, Validators.required],
      adresse: [null, Validators.required],
      description: [null, Validators.required],
      status: [null, Validators.required],
      image: [null],
      diplome: [null]
    });
  }

  patchFormData() {
    console.log('Patching form data with', this.selectedEmployer);
    this.employerForm.patchValue({
      lastname: this.selectedEmployer.lastname,
      domaine: this.selectedEmployer.domaine,
      typeProfessionnel: this.selectedEmployer.typeProfessionnel,
      adresse: this.selectedEmployer.adresse,
      description: this.selectedEmployer.description,
      status: this.selectedEmployer.status,
    });

    this.imageUrl = this.selectedEmployer.image;
  }


  submitForm() {
    if (this.employerForm.valid) {
      this.loading = true;
      
      // Vérifiez que l'ID de l'employeur est bien disponible
      if (this.selectedEmployer && this.selectedEmployer.id) {
        // Passez l'ID et le payload à la méthode `updateEmployer`
        this.employerService.updateEmployer(this.selectedEmployer.id, this.employerForm.value).subscribe(
          (response) => {
            this.success = true;
            this.successMsg = 'Employeur modifié avec succès!';
            this.loading = false;
          },
          (error) => {
            this.success = false;
            console.error(error);
            this.loading = false;
          }
        );
      } else {
        console.error('Aucun ID d\'employeur disponible');
        this.loading = false;
      }
    }
  }
  
  

uploadFile(event: any) {
      const file = event.target.files[0];
      this.employerForm.patchValue({ image: file });
      // Afficher l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.employerForm.patchValue({ diplome: file });
    }
  }

  removeFile() {
  
    this.imageUrl = null;
    this.employerForm.patchValue({ image: null });
  }

  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus;
  }

  cancel() {
    this.successMsg = '';
    this.employerForm.reset();
  }

  closeModal() {
    history.back();
    this.cancel();
  }

  backToList(): void {
    history.back();
    this.router.navigate(['/dashboard/users/employers']);
  }
}
