import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModulesService } from '../../_services/modules.service';

@Component({
  selector: 'app-edit-module',
  standalone: false,
  templateUrl: './edit-module.component.html',
  styleUrl: './edit-module.component.scss'
})
export class EditModuleComponent implements OnInit {
  editModuleForm: UntypedFormGroup ;
  isSubmitted: boolean = false;
  diplomas: any = [];
  subjects: any = [];
  imageUrl!: any;
  diplomaId: any;
  subjectId: any;
  subject: any;
  loadingAdd: boolean = false;
  page:number=1;
  perPage:number=10;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService,
    private router: Router,
    private modulesservice: ModulesService,
    private activatedRoute: ActivatedRoute,
  ){

    this.editModuleForm  = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      diploma_id: ['', Validators.required],
      coefficient: ['', Validators.required],
      color: [''],
    });
  }
  ngOnInit(): void {}

 
 
  backToList(){}
  removeImage(){}

  uploadImage(event : any ){}

  submitForm(){}

  
}
