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
  loadingAdd: boolean = false;
  showSuccess = false;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private moduleService: ModulesService,
    private router: Router
  ) {
    this.addModuleForm = this.fb.group({
       name: ['', Validators.required],
      coefficient: ['', Validators.required],
      image: ['', Validators.required],
      job_type: ['', Validators.required],
      description: [''],
      contract_duration: [''],
      salary: [''],
      work_location: [''],
      required_skills: [''],
      diploma_id: ['', Validators.required],
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

  closeModal() {
    history.back(); 
    this.cancel();   
  }

  uploadImage(event: any) {
    // Tu pourras gérer l’upload ici
  }

  removeImage() {
    this.addModuleForm.controls['image'].setValue('');
    this.imageUrl = '';
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.addModuleForm.valid) {
      this.loadingAdd = true;
      const moduleData = this.addModuleForm.value;
      this.moduleService.addModule(moduleData).subscribe(response => {
        // Ici, vous pouvez appeler la fonction pour rafraîchir la liste des modules
        // Ou émettre un événement pour notifier le composant parent
        this.loadingAdd = false;
      }, error => {
        this.loadingAdd = false;
        console.error('Erreur lors de l\'ajout du module', error);
      });
    }
  }
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }

}
