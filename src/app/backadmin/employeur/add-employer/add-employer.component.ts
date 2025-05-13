import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '../../_services/employer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employer',
  standalone:false,
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() closeAdd = new EventEmitter();
  @Output() employerAdded = new EventEmitter<any>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  employerForm!: FormGroup;
  successMsg: string = '';
errorMsg: string = '';
isSubmitted = false;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  loading = false;
  allStatus: any[] = [
    { name: 'ACTIVE', value: 'ACTIVE' },
    { name: 'EN ATTENTE', value: 'EN ATTENTE' },
    { name: 'DISABLED', value: 'DISABLED' },
    { name: 'BLOQUÉ', value: 'BLOQUE' },
    { name: 'SUSPENDU', value: 'SUSPENDU' },
    { name: 'SUPPRIMÉ', value: 'SUPPRIME' }
  ];

  constructor(private fb: FormBuilder, private employerService: EmployerService) {}

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required], // ✅ Ajouté ici
      adresse: ['', Validators.required],
      domaine: ['', Validators.required],
      typeProfessionnel: ['', Validators.required],
      description: ['', Validators.required],
      qualification: ['', Validators.required], // ✅ OK ic
      status: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.employerForm.patchValue({ image: file });
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.employerForm.invalid || !this.selectedFile) return;
  
    const formData = new FormData();
    formData.append('lastname', this.employerForm.value.lastname);
    formData.append('firstname', this.employerForm.value.firstname);
    formData.append('email', this.employerForm.value.email);
    formData.append('phone', this.employerForm.value.phone);
    formData.append('adresse', this.employerForm.value.adresse);
    formData.append('domaine', this.employerForm.value.domaine);
    formData.append('typeProfessionnel', this.employerForm.value.typeProfessionnel);
    formData.append('description', this.employerForm.value.description);
    formData.append('qualification', this.employerForm.value.qualification);
    formData.append('status', this.employerForm.value.status);
    formData.append('diplome', this.selectedFile!);
    formData.append('image', this.employerForm.value.image);
  
    this.loading = true;
  
    this.employerService.addEmployer(formData).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('✅ Réponse ajout :', res);
        Swal.fire('Succès', 'Employeur ajouté avec succès', 'success');
        this.close();
        this.employerAdded.emit(res);
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Erreur ajout employeur:', err);
        Swal.fire('Erreur', err?.error?.message || 'Erreur inconnue', 'error');
      }
    });
  }
    removeFile() {
    this.employerForm.patchValue({ image: null });
    this.imageUrl = null;
  }
  

  close() {
    this.visible = false;
    this.visibleChange.emit(false); // ← EMETTRE POUR TWO-WAY BINDING
    }
}
