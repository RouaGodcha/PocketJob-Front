import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CandidatService } from '../../_services/candidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-candidat',
  standalone: false,
  templateUrl: './update-candidat.component.html',
  styleUrl: './update-candidat.component.scss'
})
export class UpdateCandidatComponent implements OnInit {

  @Input() user: any; // Le candidat à modifier
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  updateCandidatsForm!: FormGroup;
  selectedFile: File | null = null;
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService,
    private routerService: Router
  ){}
  
  ngOnInit(): void {
    this.updateCandidatsForm = this.fb.group({
      firstname: [this.user?.firstname || '', [Validators.required, Validators.minLength(2)]],
      lastname: [this.user?.lastname || '', [Validators.required]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', [Validators.required]],
      diplome: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
/* pour  Envoie la mise à jour */

  attemptUpdateCandidat(event: Event): void {
   
  }

 
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }
  cancel(){
    this.showSuccess = false;
    this.updateCandidatsForm.reset();
  }


  closeModal() {
    history.back(); 
    this.cancel();   
  }

  onUpdateSubmit(){}
}
