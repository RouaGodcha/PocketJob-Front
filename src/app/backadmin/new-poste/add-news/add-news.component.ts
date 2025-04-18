import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../../_services/news.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-news',
  standalone:false,
  templateUrl: './add-news.component.html',
 
})
export class AddNewsComponent  {
  imageUrl!: any;
  videoUrl!: any;
  linkUrl!: any;
  thumbnailUrl!: any;
  loadingAdd = false;
  loadingNews = false;
  scrollHeight = 100;
  diplomas: any;
  subjects: any;
  chapters: any;
  positions: any = [];
  isSubmitted = false;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  existingNews: any = [];
  diplomaId: any;
  subjectId: any;
  chapterId: any;
  posTotal = 0;
  selectedFormat = '';

  allStatus: any[] = [];  // Liste des statuts
  addNewsForm: FormGroup;  // Déclaration de FormGroup
  
  filterPagination: any = {
    first: 0,
    total: 0,
    per_page: 40,
    page: 1,
    last_page: 0,
    loading: false,
    lazy: false,
  };
  formats = [
    { name: 'Image', value: 'IMAGE' },
    { name: 'Vidéo', value: 'VIDEO' },
    { name: 'Lien', value: 'LINK' }
  ];
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay

  showSuccess = false;


  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private translate: TranslateService,
  ){
    // Initialisation du formulaire avec validation
     // Simuler des données pour allStatus et positions
     this.allStatus = [
      { name: 'Actif', value: 'active' },
      { name: 'Inactif', value: 'inactive' },
    ];
    this.positions = [
      { value: 'top' },
      { value: 'middle' },
      { value: 'bottom' },
    ];

    // ✅ Ajoute cette ligne
  this.addNewsForm = this.generateForm();
  }
  overlayStatusFct() {
    this.overlayStatus = !this.overlayStatus; // Change l'état de l'overlay
  }

  // Exemple de fonction pour fermer l'overlay
  closeOverlay() {
    this.overlayStatus = false; // Ferme l'overlay
  }

  /*
    FORM
  */
    generateForm() {
      return this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        format: ['', Validators.required],
        image: [''],
        video: [''],
        link: [''],
        status: ['', Validators.required],
        position: ['', Validators.required],
        facebook: [''],
        instagram: [''],
        tiktok: [''],
        twitter: [''],
        thumbnail: [''],
      });
    }


  submitForm() {
    this.isSubmitted = true;
    if (this.addNewsForm.valid && this.requiredContent()) {
      this.loadingAdd = true;
      const formData = new FormData();
      formData.append('name', this.addNewsForm.controls['title'].value);
      formData.append(
        'description',
        this.addNewsForm.controls['description'].value
      );
      switch (this.selectedFormat) {
        case 'IMAGE':
          formData.append('image', this.addNewsForm.controls['image'].value);
          break;
        case 'VIDEO':
          formData.append('image', this.addNewsForm.controls['video'].value);
          break;
        case 'LINK':
          formData.append('video_url', this.addNewsForm.controls['link'].value);
          break;
      }
      formData.append(
        'thumbnail',
        this.addNewsForm.controls['thumbnail'].value
      );
      formData.append('type_media', this.addNewsForm.controls['format'].value);
      formData.append('position', this.addNewsForm.controls['position'].value);
      formData.append('status', this.addNewsForm.controls['status'].value);
      formData.append('facebook', this.addNewsForm.controls['facebook'].value);
      formData.append(
        'instagram',
        this.addNewsForm.controls['instagram'].value
      );
      formData.append('tiktok', this.addNewsForm.controls['tiktok'].value);
      formData.append('twitter', this.addNewsForm.controls['twitter'].value);
      this.newsService.storeNews(formData).subscribe(
        (res: any) => {
          if (res.body.result === 'success' && res.status === 200) {
            Swal.fire({
              text: this.translate.instant('NEWS.NEWS_ADDED'),
              icon: 'success',
              showCancelButton: false,
              customClass: {
                confirmButton: 'btn-primary',
              },
            }).then(() => {
              this.loadingAdd = false;
              this.isSubmitted = false;
              this.imageUrl = '';
              this.videoUrl = '';
              this.linkUrl = '';
              this.thumbnailUrl = '';
              this.addNewsForm.reset();
              this.addNewsForm = this.generateForm();
              this.getExistingNewsList();
            });
          }
        },
        (error: any) => {
          console.error(error);
          this.loadingAdd = false;
          Swal.fire({
            text: 'error ' + error.status,
            icon: 'error',
            showCancelButton: false,
            customClass: {
              confirmButton: 'btn-primary',
            },
          });
        }
      );
    }
  }

  requiredContent() {
    if (
      (this.addNewsForm.controls['image'].value !== '' &&
        this.addNewsForm.controls['format'].value === 'IMAGE') ||
      (this.addNewsForm.controls['link'].value !== '' &&
        this.addNewsForm.controls['format'].value === 'LINK') ||
      (this.addNewsForm.controls['video'].value !== '' &&
        this.addNewsForm.controls['format'].value === 'VIDEO')
    ) {
      return true;
    } else {
      return false;
    }
  }

  /*
  IMAGE
  */
  uploadFile(event: any, type: string) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length) {
      var reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      if (type === 'IMAGE') {
        this.addNewsForm.controls['image'].setValue(fileList[0]);
        reader.onload = (_event) => {
          this.imageUrl = reader.result;
        };
      } else if (type === 'VIDEO') {
        this.addNewsForm.controls['video'].setValue(fileList[0]);
        reader.onload = (_event) => {
          this.videoUrl = reader.result;
        };
      } else if (type === 'THUMBNAIL') {
        this.addNewsForm.controls['thumbnail'].setValue(fileList[0]);
        reader.onload = (_event) => {
          this.thumbnailUrl = reader.result;
        };
      }
    }
    event.currentTarget.value = '';
  }

  removeFile(type: string) {
    this.selectedFormat = type;
    switch (type) {
      case 'IMAGE':
        this.imageUrl = '';
        this.addNewsForm.controls['image'].setValue('');
        break;
      case 'VIDEO':
        this.videoUrl = '';
        this.addNewsForm.controls['video'].setValue('');
        break;
      case 'LINK':
        this.linkUrl = '';
        this.addNewsForm.controls['link'].setValue('');
        break;
      case 'THUMBNAIL':
        this.thumbnailUrl = '';
        this.addNewsForm.controls['thumbnail'].setValue('');
        break;
    }
  }

  selectFormat(event: any) {
    this.selectedFormat = event.value;
    switch (this.selectedFormat) {
      case 'IMAGE':
        this.linkUrl = '';
        this.videoUrl = '';
        this.addNewsForm.controls['link'].setValue('');
        this.addNewsForm.controls['video'].setValue('');
        break;
      case 'VIDEO':
        this.imageUrl = '';
        this.linkUrl = '';
        this.addNewsForm.controls['image'].setValue('');
        this.addNewsForm.controls['link'].setValue('');
        break;
      case 'LINK':
        this.imageUrl = '';
        this.videoUrl = '';
        this.addNewsForm.controls['image'].setValue('');
        this.addNewsForm.controls['video'].setValue('');
        break;
    }
  }
  

  /*
  PAGINATION
  */
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.per_page = $event.rows;
    this.getExistingNewsList();
  }
  next() {
    this.page++;
    this.getExistingNewsList();
  }
  prev() {
    this.page--;
    this.getExistingNewsList();
  }
  reset() {
    this.page = 0;
    this.getExistingNewsList();
  }
  isLastPage(): boolean {
    return this.page == this.last_page;
  }
  isFirstPage(): boolean {
    return this.page === 1;
  }

  /*
  APIS
  */
  getExistingNewsList() {
    let payload = {
      paginate: 1,
      page: this.page,
      per_page: this.per_page,
      filter: '',
      orderByType: 'DESC',
    };
    this.loadingNews = true;
    this.newsService.getNewsList(payload).subscribe(
      (res: any) => {
        if (res.status === 200 && res.body.result === 'success') {
          this.existingNews = res.body.data;
          this.total = res.body.paginator?.total;
          this.last_page = res.body.paginator?.last_page;
          this.loadingNews = false;
          this.posTotal = res.body.paginator?.total;
          this.positions = [];
          for (let i = 1; i <= this.posTotal + 1; i++) {
            this.positions.push({ value: i });
          }
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  
  uploadImage(event: any) {
    // Tu pourras gérer l’upload ici
  }

  removeImage() {
    this.addNewsForm.controls['image'].setValue('');
    this.imageUrl = '';
  }
  
  cancel(){
    this.showSuccess = false;
    this.addNewsForm.reset();
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

  


