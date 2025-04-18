import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../_services/categories.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-categorie',
  standalone: false ,
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss'],
})
export class AddCategorieComponent {
  
  @Output() close = new EventEmitter<any>();
  imageUrl: string | null = null;
  fileUrl: string | null = null;
  attemptSubmission = false;
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay

  showSuccess = false;

  addCategorieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,
    private categoriesService: CategoriesService
  ) {
    this.addCategorieForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
  }

  // Exemple de fonction pour fermer l'overlay
  closeOverlay() {
    this.overlayStatus = false; // Ferme l'overlay
  }

  uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.addCategorieForm.controls['image'].setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }

  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.addCategorieForm.controls['file'].setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileUrl = reader.result as string;
      };
    }
  }

  removeImage(): void {
    this.addCategorieForm.controls['image'].reset();
    this.imageUrl = null;
  }

  removeFile(): void {
    this.addCategorieForm.controls['file'].reset();
    this.fileUrl = null;
  }

  cancel(){
    this.showSuccess = false;
    this.addCategorieForm.reset();
  }

  closeModal() {
    history.back(); 
    this.cancel();   
  }
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }
  addCategorie(): void {
    this.attemptSubmission = true;

    if (this.addCategorieForm.valid) {
      const formData = new FormData();
      const formValues = this.addCategorieForm.value;
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('image', formValues.image);
      formData.append('file', formValues.file);

      this.categoriesService.addCategorie(formData).subscribe((response: any) => {
        if (response.body.result === 'success') {
          this.closeModal();
          this.attemptSubmission = false;
          Swal.fire({
            text: this.translate.instant('CATEGORIE.CATEGORIE_ADDED'),
            icon: 'success',
            customClass: { confirmButton: 'btn-primary' },
          });
        }
      });
    }
  }
}
