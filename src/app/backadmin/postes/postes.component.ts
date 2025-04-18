import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PostesService } from '../_services/postes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postes',
  standalone: false,
  templateUrl: './postes.component.html',
  styleUrl: './postes.component.scss'
})
export class PostesComponent implements OnInit {
posts: any = [];             // Liste des postes à afficher
first: number = 0;           // Premier élément de la pagination
last_page: number = 1;       // Numéro de la dernière page
setPaginator: boolean = false; // Activation de la pagination
per_page: any = 10;          // Nombre d'éléments par page
page: any = 1;              // Numéro de la page actuelle
total: any = 0;             // Nombre total de postes
showAdd: boolean = false;   // Afficher le formulaire d'ajout
showUpdate: boolean = false; // Afficher le formulaire de mise à jour
postToUpdate: any = false;  // Stocke l’élément à mettre à jour
filter: string = '';        // Filtre de recherche
showFilter: boolean = false; // Afficher/cacher le filtre
loading: boolean = false;   // Indique si le chargement est en cours
showUpdateReacts: boolean = false; // Gestion d'une autre mise à jour
postToUpdateReacts: any = false;   // Élément à mettre à jour pour une autre partie
orderBy: string | undefined;       // Champ de tri
orderByType: string = 'ASC';       // Type de tri (Ascendant/Descendant)

 
  constructor(
    private route:ActivatedRoute,
    private postesService : PostesService,
    private translate: TranslateService
  ) { 
    translate.setDefaultLang('fr'); // Définit la langue par défaut
    translate.use('fr'); // Charge la langue
  }
  ngOnInit(): void {
    this.initPagination();
  }
  
  initPagination(){

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.per_page = +params['per_page'] || 10;
      if (params['page']) {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getListPosts();
    });
  }

  getListPosts() {
    const data = {
      page: this.page,
      paginate: 1,
      per_page: this.per_page,
    };
  }

  lazyLoad($event: any){
    if (this.setPaginator) {
      $event.first = (this.page - 1) * 10;
      this.setPaginator = false;
    }
    this.page = $event.first / $event.rows + 1;
    this.per_page = $event.rows;
    this.orderBy = $event.sortField;
    this.orderByType = $event.sortOrder === 1 ? 'ASC' : 'DESC';
    this.getListPosts();
  }

  openFile(url: string) {
    window.open(url, '_blank');
  }

  AddPost() {
    this.showAdd = true;
  }
  closeAdd() {
    this.showAdd = false;
    this.getListPosts();

  }
  updatePost(Post: any) {
    this.showUpdate = true;
    this.postToUpdate = Post;
  }
  closeUpdate() {
    this.showUpdate = false;
    this.postToUpdate = false;
    this.getListPosts();
  }

  getFileExtension(url: string): string | null {
    const extensionMatch = url.match(/\.(\w+)(?:\?.*)?$/);
    return extensionMatch ? extensionMatch[1] : null;
  }

  collapse(text: string, length: number = 100): string {
    if (text.length >= length) {
      const collaps = text.substring(0, length - 3);
      return `${collaps} ...`;
    } else {
      return text;
    }
  }


  updatePostReacts(post: any) {
    this.showUpdateReacts = true;
    this.postToUpdateReacts = post;
  }

  closeUpdateReacts() {
    this.showUpdateReacts = false;
    this.postToUpdateReacts = false;
    this.getListPosts();
  }
  
  deletePost(Post: any) {
    Swal.fire({
      text: 'Voulez vous supprimer ce Post ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.postesService.dropPost(Post.id).subscribe((res: any) => {
          Swal.fire({
            text: 'Post supprimé avec succès',
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.getListPosts();
          });
        });
      }
    });
  }
  
 
  getFileType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();

    if (!extension) {
      return 'unknown';
    }

    const fileTypes: { [key: string]: string } = {
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',
      bmp: 'image',
      svg: 'image',
      pdf: 'pdf',
      doc: 'word',
      docx: 'word',
      xls: 'excel',
      xlsx: 'excel',
      ppt: 'powerpoint',
      pptx: 'powerpoint',
      txt: 'text',
      mp3: 'audio',
      wav: 'audio',
      mp4: 'video',
      avi: 'video',
      mov: 'video',
      zip: 'archive',
      rar: 'archive',
      // Add more extensions as needed
    };

    return fileTypes[extension] || 'unknown';
  }

  postImage(url: string): string {
    if (url) {
      // const extension = this.getFileExtension(url);
      const extension = this.getFileType(url);
      return extension ?? url;
    }
    return url;
  }
  
  /* Cette fonction ouvre un fichier (PDF, image, etc.) */
  

  

 

}
