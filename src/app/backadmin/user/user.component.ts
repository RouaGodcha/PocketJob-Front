import { Component, OnInit } from '@angular/core';
import {  UsersService } from '../_services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone:false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  public users: any = [];
  public userToDelete: any;
  public showingAddUser: boolean = false;
  public showingUpdateUser: boolean = false;
  public selectedUserToUpdate: any;
  
  showDelete: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
  setPaginator: boolean = false;


  allStatus: any =   [];
  diplomas: any = [];

  constructor(
    private userService: UsersService,
    private routerService: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.allStatus=
    { id: 1, name: this.translate.instant('STATUS.ACTIVE'), value: 'ACTIVE' },
   { id: 2, name: this.translate.instant('STATUS.PENDING'), value: 'PENDING' },
   {
     id: 3,
     name: this.translate.instant('STATUS.DISABLED'),
     value: 'DISABLED',
   },

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.per_page = +params['per_page'] || 10;
      if (params['page']) {
        this.first = (this.page - 1) * this.per_page;
        this.setPaginator = true;
      }
      this.getUserList();
    });
    this.getDiplomesList();
    this.searchSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.performSearch(query);
      });
  }

  openPages(id: number) {
    this.routerService.navigate(['/dashboard/users/pages/' + id]);
  }

  getUserList() {
    this.loading = true;
    let payload = {
      paginate: 1,
      per_page: this.per_page,
      page: this.page,
      filter: this.filter,
      roles: ['student'],
    };
    this.userService.getUsersList(payload).subscribe(
      (res: any) => {
        if (res.status === 200 && res.body.result === 'success') {
          this.users = res.body.data;
          this.total = res.body.paginator.total;
          this.last_page = res.body.paginator.last_page;
          this.loading = false;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  uploadDiplome(event: any, userId: number) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("diploma", file);
      
      this.userService.uploadDiplome(userId, formData).subscribe(response => {
        console.log("Fichier envoyé avec succès !");
      }, error => {
        console.error("Erreur lors de l'envoi du fichier", error);
      });
    }
  }
  
  getDiplomesList() {
    let payload = {
      paginate: 0,
    };
    this.userService.getDiplomasList(payload).subscribe(
      (res: any) => {
        if (res.body.result === 'success' && res.status === 200) {
          this.diplomas = res.body.data;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  /*
    PAGINATION & filter
   */
  search(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }
  performSearch(query: string) {
    this.filter = query ?? '';
    this.page = 1;
    this.getUserList();
  }
  lazyLoad($event: any) {
    if (this.setPaginator) {
      $event.first = (this.page - 1) * 10;
      this.setPaginator = false;
    }
    this.page = $event.first / $event.rows + 1;
    this.per_page = $event.rows;
    this.getUserList();
  }
  next() {
    this.page++;
    this.getUserList();
  }
  prev() {
    this.page--;
    this.getUserList();
  }
  reset() {
    this.page = 0;
    this.getUserList();
  }
  isLastPage(): boolean {
    return this.page == this.last_page;
  }
  isFirstPage(): boolean {
    return this.page === 1;
  }
  /*
  END PAGINATION
   */
  displayAddUser() {
    this.showingAddUser = !this.showingAddUser;
  }
  displayUpdateUser(user: any) {
    if (user !== false) {
      this.selectedUserToUpdate = user;
    }
    this.showingUpdateUser = !this.showingUpdateUser;
  }
  userDetails(id: any) {
    this.routerService.navigate(['/admin/dashboard/users/details/' + id], {
      queryParams: { page: this.page, per_page: this.per_page },
    });
  }
  deleteUser() {
    this.userService.deleteUser(this.userToDelete.id).subscribe(
      (res: any) => {
        if (res.body.result === 'success' && res.status === 200) {
          this.userToDelete = false;
          this.toggleDeleteUser();
          Swal.fire({
            text: 'Page supprimé avec succès',
            icon: 'success',
            showCancelButton: false,
            customClass: {
              confirmButton: 'btn-primary',
            },
          }).then(() => {
            this.getUserList();
          });
        }
      },
      (error: any) => {
        console.error(error);
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
  toggleDeleteUser(elm: any = false) {
    if (elm !== false) {
      this.userToDelete = elm;
    }
    this.showDelete = !this.showDelete;
  }
  updateUserStatus(id: any, event: any) {
    const formData = {
      status: event.value,
    };
    this.userService.changeStatus(id, formData).subscribe(
      (res: any) => {
        if (res.ok === true) {
          this.getUserList();
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

  