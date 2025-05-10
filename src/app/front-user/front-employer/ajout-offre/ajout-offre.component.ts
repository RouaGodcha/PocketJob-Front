import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjoutOffreService } from '../_services/ajout-offre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-offre',
  standalone: false,
  templateUrl: './ajout-offre.component.html',
  styleUrls: ['./ajout-offre.component.scss']
})
export class AjoutOffreComponent implements OnInit {
  @Input() mode: 'admin' | 'employeur' = 'employeur';
  offreForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ajoutOffreService: AjoutOffreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offreForm = this.fb.group({
      titre: ['', Validators.required],
      natureEmploi: ['', Validators.required],
      typeContrat: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      lieu: ['', Validators.required],
      profilRecherche: ['', Validators.required],
      description: ['', Validators.required],
      subventions: [''],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.offreForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    this.ajoutOffreService.ajouterOffre(this.offreForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '✅ Offre ajoutée avec succès',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/Frontemployer/dashboardEmployer']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error.message || "Erreur lors de l'ajout"
        });
      }
    });
  }
}
