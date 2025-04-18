import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesService } from '../../_services/categories.service';

@Component({
  selector: 'app-update-categorie',
  standalone: false,
  templateUrl: './update-categorie.component.html',
  styleUrl: './update-categorie.component.scss'
})
export class UpdateCategorieComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() categorie: any = false;
  @Output() close = new EventEmitter<any>();
  fileUrl: any = null;
  imageUrl: any = null;
  updateCategorieForm!: UntypedFormGroup;
  attemptSubmission: boolean = false;
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay

  showSuccess = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate : TranslateService,
    private categoriesService: CategoriesService,
  ){}

  ngOnInit(): void {
    this.updateCategorieForm = this.generateForm(); // Initialize the form

    if (this.categorie) {
      if (this.categorie?.image !== '') {
        this.imageUrl = this.categorie.image;
      }
      if (this.categorie?.file !== '') {
        this.fileUrl = this.categorie.file;
      }
    }
      
  }


  updateCategorie(){}

  generateForm() {
    return this.formBuilder.group({
      name: [
        this.categorie?.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [this.categorie?.description, Validators.required],
      image: [''],
      file: [''],
    });
  }


  removeImage(){
    this.updateCategorieForm.controls['image'].setValue('');
    this.imageUrl = '';

  }

  uploadImage(event:any){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length) {
      this.updateCategorieForm.controls['image'].setValue(fileList[0]);
      var reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = (_event) => {
        this.imageUrl = reader.result;
      };
    }
    event.currentTarget.value = '';
  }

  uploadFile(event : any){

    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length) {
      this.updateCategorieForm.controls['file'].setValue(fileList[0]);
      var reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = (_event) => {
        this.fileUrl = reader.result;
      };
    }
    event.currentTarget.value = '';

  }

  removeFile(){
    this.updateCategorieForm.controls['file'].setValue('');
    this.fileUrl = '';
  }

  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
  }

  // Exemple de fonction pour fermer l'overlay
  closeOverlay() {
    this.overlayStatus = false; // Ferme l'overlay
  }

  cancel(){
    this.showSuccess = false;
    this.updateCategorieForm.reset();
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
