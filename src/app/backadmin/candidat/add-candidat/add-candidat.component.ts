import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatService } from '../../_services/candidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidat',
  standalone: false,
  templateUrl: './add-candidat.component.html',
  styleUrl: './add-candidat.component.scss'
})
export class AddCandidatComponent implements OnInit {

  @Input() show = false;
  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();

  addCandidatForm!: FormGroup ;
  showSuccess = false;
  selectedFile: File | undefined;
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay

  constructor(
    private fb: FormBuilder ,
    private candidatService: CandidatService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.addCandidatForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      diplome: [null, [Validators.required]]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.addCandidatForm.get('diplome')?.setValue(file);
    } else {
      this.selectedFile = undefined;
      this.addCandidatForm.get('diplome')?.setValue(null);
    }
  }

  onSubmit() {
    if (this.addCandidatForm.invalid || !this.selectedFile) {
      this.addCandidatForm.markAllAsTouched();
      return;
    }

    const data = {
      firstname: this.addCandidatForm.get('firstname')?.value,
      lastname: this.addCandidatForm.get('lastname')?.value,
      email: this.addCandidatForm.get('email')?.value,
      phone: this.addCandidatForm.get('phone')?.value
    };

    this.candidatService.addCandidat(data, this.selectedFile).subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccess = true;
        this.success.emit(res);
        this.route.navigate(['dashboard/candidats']);
      },
      error: (err) => {
        console.error("Erreur ajout candidat", err);
      }
    });
  }

  // Fonction pour basculer l'état de l'overlay (cacher ou afficher)
  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
  }

  // Exemple de fonction pour fermer l'overlay
  closeOverlay() {
    this.overlayStatus = false; // Ferme l'overlay
  }


  attemptAddCandidat(event : any){}
  cancel() {
    this.showSuccess = false;
    this.addCandidatForm.reset();
    this.close.emit();  // Emit close event to hide modal if needed
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
