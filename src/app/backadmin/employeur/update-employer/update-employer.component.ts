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
export class UpdateEmployerComponent implements OnInit {
  @Input() selectedEmployer: any;
  @Input() updateEmployer: boolean = false;  // The selected employer to update
  employerForm: FormGroup;
  isSubmitted = false;
  loading = false;
  success = false;
  successMsg = '';
  imageUrl: any = null;
  selectedFile: File | null = null;
  overlayStatus: boolean = false; // Pour contrôler l'état de l'overlay
  
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
      adresse: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: [null],
      diplome: [null]
    });
  }

  ngOnInit(): void {
    if (this.selectedEmployer) {
      this.patchFormData();
    } else {
      console.error('Aucun employeur sélectionné');
    }
  }
  
    // Fonction pour basculer l'état de l'overlay (cacher ou afficher)
    overlayStatusFct() {
      this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
    }
  patchFormData() {
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
    this.isSubmitted = true;
    if (this.employerForm.valid) {
      this.loading = true;
      this.employerService.updateEmployer(this.selectedEmployer.id, this.employerForm.value).subscribe(
        response => {
          this.success = true;
          this.successMsg = 'Employeur mis à jour avec succès!';
          this.loading = false;
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.employerForm.patchValue({ image: file });
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
    this.imageUrl = null; // Reset the displayed image
    this.employerForm.patchValue({ image: null }); // Reset the form control
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
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }

}