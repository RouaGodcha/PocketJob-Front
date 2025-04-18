import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PubliciteService } from '../../_services/publicite.service';

@Component({
  selector: 'app-add-publicites',
  standalone: false,
  templateUrl: './add-publicites.component.html',
  styleUrl: './add-publicites.component.scss'
})
export class AddPublicitesComponent {

  @Output() formClosed = new EventEmitter<void>();
  isSubmitted: boolean = false;
  publiciteForm!: FormGroup;
  imageUrl: string | null = null;
  imageFile!: File;
  statusOptions = [
    { label: 'Programmé', value: 'programmé' },
    { label: 'Active', value: 'active' },
    { label: 'Suspendu', value: 'suspendu' },
    { label: 'Terminé', value: 'terminé' },
  ];
  constructor(private fb: FormBuilder, private pubService: PubliciteService) {}
  ngOnInit(){
    this.publiciteForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      date_debut: [null, Validators.required],
      date_fin: [null, Validators.required],
      statut: ['', Validators.required],
    });
  }

  

  uploadFile(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length) {
      var reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      this.publiciteForm.controls['image'].setValue(fileList[0]);
      reader.onload = (_event) => {
        this.imageUrl = reader.result as string;
      };
    }
    event.currentTarget.value = '';
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imageUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imageFile = null as any;
    this.imageUrl = null;
  }

  onSubmit() {
    if (this.publiciteForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.publiciteForm.value).forEach(([key, val]) => {
      formData.append(key, val as string);
    });
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
   /* this.pubService.create(formData).subscribe({
      next: () => {
        this.publiciteForm.reset();
        this.imageUrl = null;
        this.formClosed.emit(); // Notify parent to close modal or refresh
      },
      error: (err : any) => {
        console.error('Erreur lors de l\'ajout de la publicité', err);
      
    });*/
  }
  cancel() {
    this.formClosed.emit();
  }
}
