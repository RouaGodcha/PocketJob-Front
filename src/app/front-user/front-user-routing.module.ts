import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { HomeRegisterComponent } from './auth/register/home-register/home-register.component';
import { OffresEmploiComponent } from './offres-emploi/offres-emploi.component';
import { ReservationComponent } from './auth/register/home-register/reservation/reservation.component';
import { OffreDetailsComponent } from './offres-emploi/pages/offre-details/offre-details.component';
import { DashboardCandidatComponent } from './User/dashboard-candidat/dashboard-candidat.component';
import { CandidatureListComponent } from './User/candidature-list/candidature-list.component';
import { CvComponent } from './User/cv/cv.component';
import { MessagesComponent } from './User/messages/messages.component';
import { UserLayoutComponent } from './User/user-layout/user-layout.component';
import { AuthComponent } from './employer/auth/auth.component';

const routes: Routes = [
  {
    path: 'home',
    component : FrontLayoutComponent,
    children: [
      /*Page d'acceuil   */
      {
         path : 'acceuil',component : HomeComponent
      },

      /* Auth Utilisateur  */
      {
        path:'loginUser',
        component: LoginComponent,
      },
      {
        path :'homeRegister',
        children :[
          {path:'inscription',component : RegisterComponent },
          {path :'registerUser' , component : HomeRegisterComponent},
          { path :'reservation', component : ReservationComponent}
        
         ]
      },
      { path: 'offres', children: [
        { path: '', component: OffresEmploiComponent },
        { path: 'details-offre/:id', component: OffreDetailsComponent }
      ]},
      {
        path:'employer',
        component:AuthComponent
      }
      
    ],
  },

  {
    path: 'mon-compte',
    component : UserLayoutComponent,
    children: [
      { path: 'dashboardcandidat', component: DashboardCandidatComponent }, // accueil candidat
      { path: 'candidatures', component: CandidatureListComponent },
      { path: 'cv', component: CvComponent },
      { path: 'messages', component: MessagesComponent },

    ]
  }
  
      
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontUserRoutingModule { }
