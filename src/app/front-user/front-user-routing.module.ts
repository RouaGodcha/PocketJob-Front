import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component : FrontLayoutComponent,
    children: [
      
      /* Auth Utilisateur  */
      {
        path:'loginUser',
        component: LoginComponent,
      },
      {
        path: 'registerUser',
        component: RegisterComponent
      }
    ],
  },
      
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontUserRoutingModule { }
