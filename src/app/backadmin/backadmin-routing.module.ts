import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ForgetComponent } from './auth/forget/forget/forget.component';
import { ResetComponent } from './auth/reset/reset.component';
import { LoginComponent } from './auth/login/login/login.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [
  {
    //canActivate: [AuthGuard],
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        //canActivate: [RoleGuard],
        component: DashboardComponent,
      },
    ],
  },
  /*
   * AUTH MODULE
   */
  {
    //canActivate: [GuestGuard],
    path: 'login',
    component: LoginComponent,
  },
  {
    //canActivate: [GuestGuard],
    path: 'forget',
    component: ForgetComponent,
  },
  {
    //canActivate: [GuestGuard],
    path: 'reset',
    component: ResetComponent,
  },
  /*
   * DASHBOARD
   */
  {
    path: 'dashboard',
    //canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path:'users',
        
        children: [
          {
            path: '',
            component: UserComponent,
          },
        ]
  },
],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackadminRoutingModule { }
