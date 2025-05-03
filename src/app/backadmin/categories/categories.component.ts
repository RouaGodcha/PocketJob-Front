import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../_services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  implements OnInit {
  categories: any = [];
  first: number = 0;
  last_page: number = 1;
  setPaginator: boolean = false;
  per_page: any = 10;
  page: any = 1;
  total: any = 0;
  showAdd: boolean = false;
  showUpdate: boolean = false;
  categorieToUpdate: any = false;
  filter: string = '';
  showFilter: boolean = false;
  loading: boolean = false;
  orderBy: string | undefined;
  orderByType: string = 'ASC';

  constructor(
    private categoriesService: CategoriesService,
    private route : ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.initPagination();
  }

  initPagination() {
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.per_page = +params['per_page'] || 10;
      if (params['page']) {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getListCategories();
    });
  }


  UpdateCategorie(){}


  getListCategories() {
    // Fake Data
    const fakeData = {
      body: {
        data: [
          { id: 1, name: 'Category 1', description: 'Description for Category 1', image: 'image1.jpg', created_at: '2025-01-01' },
          { id: 2, name: 'Category 2', description: 'Description for Category 2', image: 'image2.jpg', created_at: '2025-02-01' },
          { id: 3, name: 'Category 3', description: 'Description for Category 3', image: '', created_at: '2025-03-01' },
          { id: 4, name: 'Category 4', description: 'Description for Category 4', image: 'image4.jpg', created_at: '2025-04-01' },
          // Add more categories as needed
        ],
        paginator: {
          total: 4,
          last_page: 1
        }
      }
    };
  
    // Use fake data instead of real API call
    this.categories = fakeData.body.data;
    this.total = fakeData.body.paginator.total;
    this.last_page = fakeData.body.paginator.last_page;
    this.loading = false;
  }
  



    // Fonction pour ajouter une catégorie
   addCategorie(){
    this.showAdd = true;
    }
    // Mise a jour d'une catégorie
    updateCategorie(categorie: any) {
      this.showUpdate = true;
      this.categorieToUpdate = categorie;
      this.router.navigate([`/dashboard/all-news/categories/update-categorie/`, categorie.id]);
 

    }
    
    // Suppression d'une catégorie
    deleteCategorie(categorie: any) {

      Swal.fire({
        text: 'Voulez vous supprimer ce catégorie ?',
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
          // Supprimer la catégorie
          this.categoriesService
             .dropCategorie(categorie.id)
             .subscribe((res:any) => {
              Swal.fire({
                text: 'Catégorie supprimée avec succès',
                icon: 'success',
               customClass: {
                confirmButton: 'btn-primary',
               },

              }).then ( () => {
                this.getListCategories(); // recharge les données
              });
             })
          
        }
      })
    }


    lazyLoad($event : any){
      if ( this.setPaginator){
        $event.first = (this.page - 1) * 10;
        this.setPaginator = false;
      }
      this.page = $event.first / $event.rows + 1;
      this.per_page = $event.rows;
      this.orderBy = $event.sortField;
      this.orderByType = $event.sortOrder == 1 ? 'ASC' : 'DESC';

      // this.getListCategories();
    }

    collapse(text :string, length: number = 100): string {
      if ( text.length >= length){
        const collaps = text.substring(0, length - 3);
        return `${collaps}...`;
      }else {
        return text; 
      }
    }

    closeAdd() {
      this.showAdd = false;
      this.getListCategories();
    }
    closeUpdate() {
      this.showUpdate = false;
      this.categorieToUpdate = false;
      this.getListCategories();
    }
}
