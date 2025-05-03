import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../_services/modules.service';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-module',
  standalone:false,
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

  updateModuleForm: UntypedFormGroup;
  isSubmitted: boolean = false;
  diplomas: any[] = [];  // Array of diplomas
  jobTypes: any[] = [];  // Array of job types

  imageUrl: any;
  loadingUpdate: boolean = false;
  moduleId: number | undefined = undefined;

  
  constructor(
    private fb: FormBuilder,
    private moduleService: ModulesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateModuleForm = this.fb.group({
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
    this.route.params.subscribe(params => {
      this.moduleId = params['id'];  // Get the module ID from the route
      this.getModuleData();
    });

    this.getDiplomasList();
    this.getJobTypesList();
  }

  getModuleData() {
    // Get the data for the module
    this.moduleService.getModuleById(this.moduleId).subscribe(response => {
      const data = response.body;  // Assuming the data is wrapped in 'body'
      this.updateModuleForm.patchValue(data);  // Patch the form with the data
      this.imageUrl = data.imageUrl;  // Pre-fill image if available
    });
  }
  
  getDiplomasList() {
    this.moduleService.getDiplomasList({ paginate: 0 }).subscribe((data) => {
      this.diplomas = data.body;  // Assuming the data is wrapped in a 'body' property
    });
  }
  
  getJobTypesList() {
    this.moduleService.getJobTypesList({}).subscribe((data) => {
      this.jobTypes = data.body;  // Assuming the data is wrapped in 'body'
    });
  }
  

  uploadImage(event: any) {
    // Handle the image upload
  }

  removeImage() {
    this.updateModuleForm.controls['image'].setValue('');
    this.imageUrl = '';
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.updateModuleForm.valid) {
      this.loadingUpdate = true;
      const updatedModuleData = this.updateModuleForm.value;
      this.moduleService.updateModule(this.moduleId, updatedModuleData).subscribe(response => {
        Swal.fire('Succès', 'Le module a été mis à jour', 'success');
        this.loadingUpdate = false;
        this.router.navigate(['/modules']);  // Redirect to the modules list page
      }, error => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour', 'error');
        this.loadingUpdate = false;
      });
    }
  }

  cancel() {
    this.updateModuleForm.reset();
  }

  closeModal() {
    history.back();
    this.cancel();
  }

  backToList() {
    history.back(); // Go back to the previous page
  }
}
