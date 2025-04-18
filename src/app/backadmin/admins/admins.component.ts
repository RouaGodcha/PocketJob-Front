import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admins',
  standalone: false,
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss'
})
export class AdminsComponent  implements OnInit {

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  public admins: any = [];
  public adminToDelete: any;
  public showingAddAdmin: boolean = false;
  public showingUpdateAdmin: boolean = false;
  public selectedAdminToUpdate: any;
  showDelete: boolean = false;
  showUpdatePassword: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = "";
  loading: boolean = false;
  allStatus: any = [
    { id: 1, name: "ACTIVE", value: "ACTIVE" },
    { id: 2, name: "NON ACTIVE", value: "NON ACTIVE" },
    { id: 3, name: "DISABLED", value: "DISABLED" },
  ];
  adminToUpdatePassword: any;
  constructor(
    private usersService: UsersService,
    private routerService: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe((query: any) => {
      this.performSearch(query);
    });
  }

  getAdminList() {
    let payload = {
      paginate: 1,
      per_page: this.per_page,
      page:this.page,
      filter: this.filter,
      roles: ["admin"]
    }
    this.loading = true;
    this.usersService.getUsersList(payload).subscribe((res: any) => {
      if (res.status === 200 && res.body.result === 'success') {
        this.admins = res.body.data;
        this.total = res.body.paginator.total;
        this.last_page = res.body.paginator.last_page;
        this.loading = false;
      }
    }, (error: any) => { console.error(error); });
  }

  /*
    PAGINATION & filter
   */
    search(event: any) {
      const query = event.target.value;
      this.searchSubject.next(query);
    }
    performSearch(query: string) {
      this.filter = query ?? "";
      this.page = 1;
      this.getAdminList();
    }
    lazyLoad($event: any) {
      this.page = ($event.first / $event.rows) + 1;
      this.per_page = $event.rows
      this.getAdminList();
    }
    next() {
      this.page++;
      this.getAdminList();
    }
    prev() {
      this.page--;
      this.getAdminList();
    }
    reset() {
      this.page = 0;
      this.getAdminList();
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
  displayAddAdmin() {
    this.showingAddAdmin = !this.showingAddAdmin;
  }
  displayUpdateAdmin(admin: any = false) {
    if (admin !== false) {
      this.selectedAdminToUpdate = admin;
    }
    this.showingUpdateAdmin = !this.showingUpdateAdmin;
  }
  adminDetails(id: any) {
    this.routerService.navigate(['/dashboard/admins/details/' + id]);
  }
  deleteAdmin() {
    this.usersService.deleteUser(this.adminToDelete.id).subscribe((res: any) => {
      if (res.body.result === "success" && res.status === 200) {
        this.adminToDelete = false;
        this.toggleDeleteAdmin();
        Swal.fire({
          text: this.translate.instant('ADMINS.ADMIN_DELETED'),
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          }
        }).then(() => {
          this.getAdminList();
        })
      }
    }, (error: any) => {
      console.error(error);
      Swal.fire({
        text: "error " + error.status,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn-primary',
        }
      })
    })
  }
  toggleDeleteAdmin(elm: any = false) {
    if (elm !== false) {
      this.adminToDelete = elm;
    }
    this.showDelete = !this.showDelete;
  }
  toggleUpdatePassword(admin: any) {
    this.showUpdatePassword = !this.showUpdatePassword;
    this.adminToUpdatePassword = admin
  }
  updateAdminStatus(id: any, event: any) {
    const formData = {
      "status": event.value,
    }
    this.usersService.changeStatus(id, formData).subscribe((res: any) => {
      if (res.ok === true) {
        this.getAdminList()
      }
    }, (error: any) => { console.error(error); });
  }
}
