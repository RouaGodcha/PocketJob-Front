import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '../../_services/employer.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-employer',
  standalone: false,
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent implements OnInit {
  @Input() addEmployer: boolean = false;
  @Output() employerAdded: EventEmitter<any> = new EventEmitter();
  @Output() closeAdd: EventEmitter<any> = new EventEmitter();

  employerForm!: FormGroup;
  imageUrl: string | null = null;
  addEmployerTitle: any;
  overlayStatus: boolean = false; // Pour contrôler l'état de l'overlay
  isSubmitted: boolean = false;
  successMsg: string = '';
  loading: boolean = false;

  success: boolean = false;
  selectedFile: File | null = null;
  allStatus = [
    { name: 'ACTIVE', value: 'ACTIVE' },
    { name: 'PENDING', value: 'PENDING' },
    { name: 'DISABLED', value: 'DISABLED' },
    { name: 'BLOQUÉ', value: 'BLOQUE' },
    { name: 'SUSPENDU', value: 'SUSPENDU' },
    { name: 'SUPPRIMÉ', value: 'SUPPRIME' }
  ];

  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService,
    private translate: TranslateService,
    private router: Router
  ) {}

  // Fonction pour basculer l'état de l'overlay (cacher ou afficher)
  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
  }

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      domaine: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      status: ['ACTIVE', Validators.required],
      image: ['', Validators.required],
      qualification: ['', Validators.required],
      description: ['', Validators.required],
      typeProfessionnel: ['', Validators.required], 
    });
  }

  removeFile() {
    this.imageUrl = null;
    this.employerForm.controls['image'].setValue('');
  }

  uploadFile(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length) {
      var reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      this.employerForm.controls['image'].setValue(fileList[0]);
      reader.onload = (_event) => {
        this.imageUrl = reader.result as string;
      };
    }
    event.currentTarget.value = '';
  }

  submitForm() {
    this.isSubmitted = true;

    // Vérifications des fichiers requis avant de soumettre
    if (!this.employerForm.controls['image'].value) {
      this.successMsg = "L'image est requise";
      this.success = false;
      return;
    }

    if (!this.selectedFile) {
      this.successMsg = "Le diplôme est requis";
      this.success = false;
      return;
    }

    if (this.employerForm.valid) {
      this.loading = true;

      const formData = new FormData();
      formData.append('firstname', this.employerForm.controls['firstname'].value);
      formData.append('lastname', this.employerForm.controls['lastname'].value);
      formData.append('domaine', this.employerForm.controls['domaine'].value);
      formData.append('adresse', this.employerForm.controls['adresse'].value);
      formData.append('phone', this.employerForm.controls['phone'].value);
      formData.append('status', this.employerForm.controls['status'].value);
      formData.append('image', this.employerForm.controls['image'].value);
      formData.append('description', this.employerForm.controls['description'].value);
      formData.append('diploma_id', this.employerForm.controls['diploma_id'].value);
      formData.append('subject_id', this.employerForm.controls['subject_id'].value);
      formData.append('qualification', this.employerForm.controls['qualification'].value);
      formData.append('typeProfessionnel', this.employerForm.controls['typeProfessionnel'].value);

      this.successMsg = "Une erreur s'est produite lors de l'ajout de l'employeur.";
      this.success = false;

      this.employerService.addEmployer(formData).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.success = true;
          this.successMsg = "L'employeur a été ajouté avec succès.";
          setTimeout(() => {
            this.success = false;
            this.successMsg = '';
          }, 3000);
          
        },
        error: (err) => {
          this.loading = false;
          console.error(err); // Pour voir l'erreur dans la console
          this.successMsg = "Une erreur s'est produite. Veuillez réessayer.";
          this.success = false;
        }
      });
    } else {
      this.employerForm.markAllAsTouched();
    }
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

  attemptAddCandidat(event: any) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
