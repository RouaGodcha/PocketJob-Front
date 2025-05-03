import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatureService } from '../../_services/candidature.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-candidature',
  standalone: false,
  templateUrl: './update-candidature.component.html',
  styleUrls: ['./update-candidature.component.scss']
})
export class UpdateCandidatureComponent implements OnInit {
  candidature = {
    nomCandidat: '',
    offreReference: '',
    entrepriseNom: '',
    domaine: '',
    statut: ''
  };
  isSubmitted: boolean = false;
  updateCandidatureForm!: FormGroup;

  statusOptions = [
    { label: 'En attente', value: 'en_attente' },
    { label: 'Accepté', value: 'accepte' },
    { label: 'Refusé', value: 'refuse' }
  ];

  // Popup visibility flags
  displaySuccess: boolean = false;
  displayError: boolean = false;

  constructor(
    private messageService: MessageService,
    private candidatureService: CandidatureService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateCandidatureForm = this.fb.group({
      nomCandidat: ['', Validators.required],
      offreReference: ['', Validators.required],
      entrepriseNom: ['', Validators.required],
      domaine: ['', Validators.required],
      statut: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCandidature(id);
    }
  }

  loadCandidature(id: string | null) {
    if (id) {
      this.candidatureService.getCandidatureById(id).subscribe(data => {
        this.candidature = data;
      });
    }
  }

  updateCandidature() {
    this.isSubmitted = true;

    if (this.updateCandidatureForm.invalid) {
      return; // stop if form is invalid
    }

    const formData = this.updateCandidatureForm.value;
    this.candidatureService.updateCandidature(this.candidature).subscribe(
      response => {
        // Display success dialog
        this.displaySuccess = true;
      },
      error => {
        // Display error dialog
        this.displayError = true;
        console.error('Erreur lors de la mise à jour de la candidature', error);
      }
    );
  }

  backToList(): void {
    history.back();
    console.log('Retour à la liste');
  }

  closeModal() {
    history.back();
    this.cancel();
  }

  cancel() {
    this.updateCandidatureForm.reset();
    this.router.navigate(['/dashboard/candidature']);
  }

  // Close dialog method
  closeDialog() {
    this.displaySuccess = false;
    this.displayError = false;
  }
}
