import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../_services/modules.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-module',
  standalone: false,
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss'] // <-- styleUrls doit être un tableau
})
export class AddModuleComponent implements OnInit {

  addModuleForm: UntypedFormGroup;
  isSubmitted: boolean = false;
  diplomas: any[] = [];  // Array of diplomas
  jobTypes: any[] = [];  // Array of job types

  subjects: any[] = [];
  imageUrl: any;
  diplomaId: any;
  selectedImage: File | null = null;
  selectedCV: File | null = null;
  cvFileName: string = '';
  loadingAdd: boolean = false;
  showSuccess = false;
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private moduleService: ModulesService,
    private router: Router
  ) {
    this.addModuleForm = this.fb.group({
      diploma_id: ['', Validators.required],
      job_type: [''],
      name: ['', Validators.required],
      contract_duration: ['', Validators.required],
      salary: ['', Validators.required],
      required_skills: [''],
      work_location: ['', Validators.required],
      description: [''],
      image: [null],
      cv: [null]
    });
  }

  ngOnInit(): void {
    this.getDiplomasList();
  }

  getDiplomasList() {
    // Tu pourras appeler ton service ici, exemple :
    // this.moduleService.getDiplomas().subscribe((data) => this.diplomas = data);
  }
  
  cancel(){
    this.showSuccess = false;
    this.addModuleForm.reset();
  }

  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
  }

  // Exemple de fonction pour fermer l'overlay
  closeOverlay() {
    this.overlayStatus = false; // Ferme l'overlay
  }

  closeModal() {
    history.back(); 
    this.cancel();   
  }
  uploadImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.imageUrl = URL.createObjectURL(file);
      this.addModuleForm.patchValue({ image: file });
    }
  }

  removeImage(): void {
    this.imageUrl = null;
    this.selectedImage = null;
    this.addModuleForm.patchValue({ image: null });
  }


  uploadCV(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedCV = file;
      this.cvFileName = file.name;
      this.addModuleForm.patchValue({ cv: file });
    }
  }

  removeCV(): void {
    this.selectedCV = null;
    this.cvFileName = '';
    this.addModuleForm.patchValue({ cv: null });
  }
  

  submitForm() {
    this.isSubmitted = true;
    if (this.addModuleForm.invalid) return;
  
    const formData = new FormData();
    Object.keys(this.addModuleForm.controls).forEach(key => {
      const value = this.addModuleForm.get(key)?.value;
      if (value) formData.append(key, value);
    });
  
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
  
    if (this.selectedCV) {
      formData.append('cv', this.selectedCV);
    }
  
    this.loadingAdd = true;
  
    this.moduleService.addModule(formData).subscribe({
      next: (res) => {
        if (res.body?.result === 'success') {
          Swal.fire('Succès', 'Offre ajoutée avec succès 🎉', 'success');
          this.router.navigate(['/admin/offre-emploi/modules']);
        }
        this.loadingAdd = false;
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout', err);
        this.loadingAdd = false;
      }
    });
    

    // Simuler envoi
    setTimeout(() => {
      this.loadingAdd = false;
      alert('Offre ajoutée avec succès 🎉');
    }, 1500);
  }
  
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }

}
