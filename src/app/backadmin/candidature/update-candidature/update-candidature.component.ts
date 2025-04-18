import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatureService } from '../../_services/candidature.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-candidature',
  standalone: false,
  templateUrl: './update-candidature.component.html',
  styleUrl: './update-candidature.component.scss'
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
  showSuccess: any;

  constructor(
    private messageService: MessageService,
    private candidatureService: CandidatureService,
    private router: Router,
    private fb : FormBuilder,
    private route: ActivatedRoute
  ) {
    
    
  }

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
      return; // stop si formulaire invalide
    }

    const formData = this.updateCandidatureForm.value;
  // Appel à l’API ou traitement
  
    this.candidatureService.updateCandidature(this.candidature).subscribe(
      response => {
        // ✅ Affiche le toast
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Candidature modifiée avec succès ✅',
          life: 3000 ,// durée du toast en ms
          closable :true
        });
  
        // ❌ Supprime la redirection automatique si tu veux garder l'utilisateur sur place
        // this.router.navigate(['/dashboard/candidatures']);
      },
      error => {
        // En cas d'erreur, tu peux afficher un autre toast
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la modification ❌',
          life: 3000
        });
        console.error('Erreur lors de la mise à jour de la candidature', error);
      }
    );
  }
  
  
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }
  cancel(){
    this.showSuccess = false;
    this.updateCandidatureForm.reset();
    this.router.navigate(['/dashboard/candidature']);
  
  }


  closeModal() {
    history.back(); 
    this.cancel();   
  }
  
}