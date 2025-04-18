import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NewsService } from '../../_services/news.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';


interface NewsItem {
  name: string;
  position: string;
}
@Component({
  selector: 'app-update-news',
  standalone: false,
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.scss'
})
export class UpdateNewsComponent implements OnInit {
  showSuccess = false;
  overlayStatus: boolean = false;  // Pour contrôler l'état de l'overlay

  updateNewsForm!: FormGroup;
  isSubmitted = false;
  loadingEdit = false;
  selectedFormat = '';
  existingNews: NewsItem[] = [];  // Définir le type des éléments du tableau
 
  per_page = 5;
  total = 0;
  loadingNews = false;
  
  imageUrl: any;
  videoUrl: any;
  linkUrl: any;
  thumbnailUrl: any;

  positions: any = [];
  // Dropdown data
  allStatus = [
    { name: 'Actif', value: 'ACTIVE' },
    { name: 'Inactif', value: 'INACTIVE' }
  ];

  formats = [
    { name: 'Image', value: 'IMAGE' },
    { name: 'Vidéo', value: 'VIDEO' },
    { name: 'Lien', value: 'LINK' }
  ];

  

  constructor( 
    private formBuilder : UntypedFormBuilder,
    private newsService: NewsService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}
  

  ngOnInit(): void {
    this.initForm();
    this.loadExistingNews();
  }

  initForm() {
    this.updateNewsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [null, Validators.required],
      position: [null, Validators.required],
      thumbnail: [null],
      format: [null, Validators.required],
      image: [null],
      video: [null],
      link: [''],
      facebook: [''],
      instagram: [''],
      twitter: ['']
    });
  }

  loadExistingNews() {
    this.loadingNews = true;
    // Fake timeout - replace with your API call
    setTimeout(() => {
      this.existingNews = [
        { name: 'News 1', position: 'TOP' },
        { name: 'News 2', position: 'BOTTOM' }
      ];
      this.total = this.existingNews.length;
      this.loadingNews = false;
    }, 500);
  }


  uploadFile(event: any, type: 'THUMBNAIL' | 'IMAGE' | 'VIDEO') {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      switch (type) {
        case 'THUMBNAIL':
          this.thumbnailUrl = reader.result as string;
          this.updateNewsForm.patchValue({ thumbnail: file });
          break;
        case 'IMAGE':
          this.imageUrl = reader.result as string;
          this.updateNewsForm.patchValue({ image: file });
          break;
        case 'VIDEO':
          this.videoUrl = reader.result as string;
          this.updateNewsForm.patchValue({ video: file });
          break;
      }
    };
    reader.readAsDataURL(file);
  }

  removeFile(type: 'THUMBNAIL' | 'IMAGE' | 'VIDEO') {
    switch (type) {
      case 'THUMBNAIL':
        this.thumbnailUrl = null;
        this.updateNewsForm.patchValue({ thumbnail: null });
        break;
      case 'IMAGE':
        this.imageUrl = null;
        this.updateNewsForm.patchValue({ image: null });
        break;
      case 'VIDEO':
        this.videoUrl = null;
        this.updateNewsForm.patchValue({ video: null });
        break;
    }
  }

  requiredContent(): boolean {
    const format = this.updateNewsForm.controls['format'].value;
    if (format === 'IMAGE') {
      return !!this.updateNewsForm.controls['image'].value;
    }
    if (format === 'VIDEO') {
      return !!this.updateNewsForm.controls['video'].value;
    }
    if (format === 'LINK') {
      return !!this.updateNewsForm.controls['link'].value;
    }
    return false;
  }

  submitForm() {
    this.isSubmitted = true;

    if (this.updateNewsForm.invalid || !this.requiredContent()) {
      this.newsService.addNews({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs requis'
      });
      return;
    }

    this.loadingEdit = true;

    const formData = new FormData();
    Object.keys(this.updateNewsForm.controls).forEach(key => {
      const controlValue = this.updateNewsForm.get(key)?.value;
      if (controlValue) {
        formData.append(key, controlValue);
      }
    });

    // 👉 Envoi vers API (à adapter avec ton service)
    setTimeout(() => {
      this.loadingEdit = false;
      this.newsService.addNews({
        severity: 'success',
        summary: 'Succès',
        detail: 'Actualité mise à jour avec succès !'
      });
      this.backToList();
    }, 1000);
  }
  selectFormat(event: any) {
    this.selectedFormat = event.value;
    switch (this.selectedFormat) {
      case 'IMAGE':
        this.linkUrl = '';
        this.videoUrl = '';
        this.updateNewsForm.controls['link'].setValue('');
        this.updateNewsForm.controls['video'].setValue('');
        break;
      case 'VIDEO':
        this.imageUrl = '';
        this.linkUrl = '';
        this.updateNewsForm.controls['image'].setValue('');
        this.updateNewsForm.controls['link'].setValue('');
        break;
      case 'LINK':
        this.imageUrl = '';
        this.videoUrl = '';
        this.updateNewsForm.controls['image'].setValue('');
        this.updateNewsForm.controls['video'].setValue('');
        break;
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
   this.updateNewsForm.get('file')?.reset();
 }


  cancel(){
    this.showSuccess = false;
    this.updateNewsForm.reset();
  }

  closeModal() {
    history.back(); 
    this.cancel();   
  }
  backToList(): void {
    history.back(); // Revenir à la page précédente
    console.log('Retour à la liste');
  }

  lazyLoad(event: any) {
    // Pour la pagination si tu la relies à une API
    console.log('lazy load : ', event);
  }
}

