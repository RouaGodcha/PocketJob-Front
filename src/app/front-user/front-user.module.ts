import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontUserRoutingModule } from './front-user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FrontLayoutComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  
    RouterModule.forRoot([]) ,
    HttpClientModule,
    FrontUserRoutingModule
  ]
})
export class FrontUserModule { }
