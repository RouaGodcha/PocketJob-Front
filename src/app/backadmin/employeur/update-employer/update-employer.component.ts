import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '../../_services/employer.service';
import Swal from 'sweetalert2';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-update-employer',
  standalone:false,
  templateUrl: './update-employer.component.html',
  styleUrls: ['./update-employer.component.scss']
})
export class UpdateEmployerComponent implements OnInit,OnChanges  {
  @Input() employerData: any; // 👈 à passer depuis le parent
  @Input() visible: boolean = false;
  @Output() employerUpdated = new EventEmitter<any>();
  @Output() visibleChange = new EventEmitter<boolean>();

  employerForm!: FormGroup;
  isSubmitted = false;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  loading = false;

  allStatus = [
    { name: 'ACTIF', value: 'ACTIVE' },
    { name: 'INACTIF', value: 'INACTIVE' }
  ];

  constructor(private fb: FormBuilder, private employerService: EmployerService) {}

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      domaine: ['', Validators.required],
      typeProfessionnel: ['', Validators.required],
      description: ['', Validators.required],
      qualification: ['', Validators.required],
      status: ['', Validators.required],
      image: [null]
    });

    if (this.employerData) {
      this.employerForm.patchValue(this.employerData);
      this.imageUrl = this.employerData.image;
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.employerForm.patchValue({ image: file });
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employerData'] && this.employerData) {
      const cleaned = this.sanitizeData(this.employerData);
      this.employerForm.patchValue(cleaned);
      this.imageUrl = this.employerData.image ? `http://127.0.0.1:8000/storage/${this.employerData.image}` : null;
    }
  }
  sanitizeData(data: any) {
    const sanitized: any = {};
    for (let key in data) {
      if (data[key] === undefined || data[key] === null) {
        sanitized[key] = '';
      } else if (typeof data[key] === 'object') {
        sanitized[key] = '';
      } else {
        sanitized[key] = data[key];
      }
    }
    return sanitized;
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submitForm() {
    this.isSubmitted = true;
  
    if (this.employerForm.invalid) return;
  
    const formData = new FormData();
  
    // Ajout du champ 'name' combiné
    formData.append('name', `${this.employerForm.value.firstname} ${this.employerForm.value.lastname}`);
  
    // Ajout des autres champs, sauf les objets et les URLs d'image
    Object.entries(this.employerForm.value).forEach(([key, value]) => {
      if (key === 'image' && typeof value === 'string') {
        return; // ne pas envoyer une URL d'image
      }
    
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && typeof value !== 'object') {
        formData.append(key, value?.toString() ?? '');
      }
    });
    
    // Ajout du fichier diplôme s'il existe
    if (this.selectedFile) {
      formData.append('diplome', this.selectedFile);
    }
  
    // 🔍 DEBUG : Afficher le contenu du formData
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    this.loading = true;
  
    this.employerService.updateEmployer(this.employerData.id, formData).subscribe({
      next: (res) => {
        this.loading = false;
        Swal.fire('Succès', 'Employeur mis à jour avec succès', 'success');
        this.close();
        this.employerUpdated.emit(res);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        Swal.fire('Erreur', err?.error?.message || 'Une erreur est survenue', 'error');
      }
    });
  }
  
  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  removeFile() {
    this.employerForm.patchValue({ image: null });
    this.imageUrl = null;
  }
}
