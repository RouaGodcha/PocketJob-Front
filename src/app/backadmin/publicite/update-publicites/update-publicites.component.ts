import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PubliciteService } from '../../_services/publicite.service';

@Component({
  selector: 'app-update-publicites',
  standalone: false,
  templateUrl: './update-publicites.component.html',
  styleUrls: ['./update-publicites.component.scss']
})
export class UpdatePublicitesComponent implements OnInit {
  publiciteForm!: FormGroup;
  imageUrl: string | null = null;
  publiciteId!: number;
  isSubmitted: boolean = false;
  statusList = [
    { label: 'Programmé', value: 'Programmé' },
    { label: 'Actif', value: 'Actif' },
    { label: 'Suspendu', value: 'Suspendu' },
    { label: 'Terminé', value: 'Terminé' }
  ];
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private publiciteService: PubliciteService
  ) {}

  ngOnInit(): void {
    this.publiciteForm = this.fb.group({
      nom: ['', Validators.required], 
      date_debut: [null, Validators.required],
      date_fin: [null, Validators.required],
      statut: [null, Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.publiciteId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPublicite();
  }

  loadPublicite(): void {
    this.publiciteService.getPubliciteById(this.publiciteId).subscribe((data) => {
      this.publiciteForm.patchValue({
        nom: data.nom,
        date_debut: new Date(data.date_debut),
        date_fin: new Date(data.date_fin),
        statut: data.statut,
        description: data.description
      });
      this.imageUrl = data.image_url;
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.publiciteForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imageUrl = null;
    this.publiciteForm.patchValue({ image: null });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.publiciteForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.publiciteForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString().split('T')[0]);
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    this.publiciteService.updatePublicites(this.publiciteId, formData).subscribe(() => {
      this.router.navigate(['/dashboard/publicites']);
    });
  }

  cancel() {
    this.successMsg = '';
    this.publiciteForm.reset();
    this.isSubmitted = false; // Reset the submission flag
  }

  closeModal() {
    history.back();
    this.cancel();
  }

  backToList(): void {
    history.back(); 
  }
}
