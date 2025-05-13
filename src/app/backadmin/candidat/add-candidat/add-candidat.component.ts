import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatService } from '../../_services/candidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidat',
  standalone:false,
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  addCandidatForm!: FormGroup;
  selectedFile: File | null = null;
  fileTouched: boolean = false;
  showSuccess: boolean = false;
  isSubmitted: boolean = false;
  loading: boolean = false;
  imageUrl: string | null = null;
  allStatus: any[] = [
    { name: 'ACTIVE', value: 'ACTIVE' },
    { name: 'En ATTENTE', value: 'EN ATTENTE' },
    { name: 'BLOQUÉ', value: 'BLOQUE' }
  ];

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addCandidatForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }
  
  isInvalid(control: string): boolean {
    const c = this.addCandidatForm.get(control);
    return !!(c && c.invalid && (c.dirty || c.touched || this.isSubmitted));
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] || null;
    this.fileTouched = true;
  }

  removeFile() {
    this.selectedFile = null;
    this.fileTouched = true;
  }

  submitForm() {
    this.isSubmitted = true;
    this.fileTouched = true;
  
    if (this.addCandidatForm.invalid || !this.selectedFile) return;
  
    const formData = new FormData();
    formData.append('firstname', this.addCandidatForm.get('firstname')?.value);
    formData.append('lastname', this.addCandidatForm.get('lastname')?.value);
    formData.append('email', this.addCandidatForm.get('email')?.value);
    formData.append('phone', this.addCandidatForm.get('phone')?.value);
    formData.append('status', this.addCandidatForm.get('status')?.value);
    formData.append('diplome', this.selectedFile!);
  
    this.loading = true;
  
    this.candidatService.addCandidat(formData).subscribe({
      next: () => {
        this.loading = false;
        this.showSuccess = true;
        this.success.emit(true);
        setTimeout(() => this.cancel(), 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Erreur serveur:', err);
        if (err.error?.errors) {
          Object.keys(err.error.errors).forEach(field => {
            this.addCandidatForm.get(field)?.setErrors({ backend: err.error.errors[field][0] });
          });
        }
      }
    });
  }
  
  cancel() {
    this.showSuccess = false;
    this.isSubmitted = false;
    this.fileTouched = false;
    this.addCandidatForm.reset();
    this.selectedFile = null;
    this.show = false;
    this.showChange.emit(false);
    this.close.emit(true);
  }

  closeModal() {
    this.cancel();
  }
}
