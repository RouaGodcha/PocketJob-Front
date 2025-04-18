import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PostesService } from '../../_services/postes.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-postes',
  standalone: false,
  templateUrl: './add-postes.component.html',
  styleUrls: ['./add-postes.component.scss']
})
export class AddPostesComponent
{
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<any>();
  
  addPostForm: UntypedFormGroup;
  imageUrl: string | null = null; // Pour stocker l'URL de l'image
  showSuccess = false;
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay


  constructor(private fb: UntypedFormBuilder) {
    this.addPostForm = this.fb.group({
      description: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  // Méthode pour gérer la sélection d'image
  uploadImage(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Stocker l'image en base64
      };
      reader.readAsDataURL(file);
    }
  }
   // Fonction pour basculer l'état de l'overlay (cacher ou afficher)
   overlayStatusFct() {
     this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
   }
 
   // Exemple de fonction pour fermer l'overlay
   closeOverlay() {
     this.overlayStatus = false; // Ferme l'overlay
   }

   // Vérifier si l'image est en base64
   isBase64Image(data: string): boolean {
    const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/;
    return regex.test(data);
  }

  // Méthode pour supprimer l'image
  removeImage(): void {
    this.imageUrl = null;
    this.addPostForm.get('file')?.reset();
  }


     // Méthode pour ouvrir le modal
  
  // Méthode de soumission du formulaire
  addPost(): void {
    if (this.addPostForm.valid) {
      const formData = this.addPostForm.value;
      console.log('Formulaire soumis:', formData);
      // Vous pouvez envoyer les données à votre API ici
    } else {
      console.log('Le formulaire est invalide');
    }
  }

  
  cancel(){
    this.showSuccess = false;
    this.addPostForm.reset();
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