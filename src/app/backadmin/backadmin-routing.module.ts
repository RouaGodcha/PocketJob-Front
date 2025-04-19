import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ForgetComponent } from './auth/forget/forget/forget.component';
import { ResetComponent } from './auth/reset/reset.component';
import { LoginComponent } from './auth/login/login/login.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { PostesComponent } from './postes/postes.component';
import { AddPostesComponent } from './postes/add-postes/add-postes.component';
import { AuthGuard } from '../_guard/auth.guard';
import { RoleGuard } from '../_guard/role.guard';
import { CategoriesComponent } from './categories/categories.component';
import { MediasComponent } from './medias/medias.component';
import { NewPosteComponent } from './new-poste/new-poste.component';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './categories/update-categorie/update-categorie.component';
import { AddNewsComponent } from './new-poste/add-news/add-news.component';
import { ModulesComponent } from './modules/modules.component';
import { QcmsComponent } from './qcms/qcms.component';
import { FichesComponent } from './fiches/fiches.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { EditModuleComponent } from './modules/edit-module/edit-module.component';
import { CandidatComponent } from './candidat/candidat.component';
import { AddCandidatComponent } from './candidat/add-candidat/add-candidat.component';
import { UpdateCandidatComponent } from './candidat/update-candidat/update-candidat.component';
import { ViewCandidatComponent } from './candidat/view-candidat/view-candidat.component';
import { EmployeurComponent } from './employeur/employeur.component';
import { AddEmployerComponent } from './employeur/add-employer/add-employer.component';
import { UpdateNewsComponent } from './new-poste/update-news/update-news.component';
import { ViewNewsComponent } from './new-poste/view-news/view-news.component';
import { UpdatePostesComponent } from './postes/update-postes/update-postes.component';
import { UpdatePostesReactionComponent } from './postes/update-postes-reaction/update-postes-reaction.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { UpdateEmployerComponent } from './employeur/update-employer/update-employer.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { UpdateCandidatureComponent } from './candidature/update-candidature/update-candidature.component';
import { AdminsComponent } from './admins/admins.component';
import { ViewAdminComponent } from './admins/view-admin/view-admin.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { AddPublicitesComponent } from './publicite/add-publicites/add-publicites.component';
import { UpdatePublicitesComponent } from './publicite/update-publicites/update-publicites.component';
import { MessagerieComponent } from './messagerie/messagerie.component';

const routes: Routes = 
[
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  
  },

  // AUTH MODULE
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forget',
    component: ForgetComponent,
  },
  {
    path: 'reset',
    component: ResetComponent,
  },


  // DASHBOARD
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'configurations',
        component: ConfigurationsComponent,
      },

      

      

      // USER MODULE
      {
        path: 'users',
        children: 
        [
          { 
            path: '', component: UserComponent },
          {  path: 'add-user', component: AddUserComponent  
          },
          {
            path : 'candidats',
            children :[
              {
                path : '', component : CandidatComponent
              },
              {
                path : 'add-candidat', component : AddCandidatComponent
              },
              {
                path : 'update-candidat', component : UpdateCandidatComponent
              },
              /* detailes de candidats  */
              {
                path : 'Viewcandidats', component : ViewCandidatComponent
              }
            ]
          },

          {
            path :'employers',
            children : [
              { path : '' , component : EmployeurComponent},
              { path : 'add-employer',component : AddEmployerComponent},
              { path :'update-employer' , component : UpdateEmployerComponent}
            ]
          }
        ],
       
      },
     
      
      

      // HOME (PocketJob) ==> postes
      {
        path: 'pocketjob',
        children: [
          {
            path: 'postes',
            children: [
              { path: '', component: PostesComponent },
              { path: 'add-postes', component: AddPostesComponent },
              { path : 'update-postes', component : UpdatePostesComponent},
              { path :'update-postesupdate-postes-react', component : UpdatePostesReactionComponent}
            ],
          },
        ]
      },

      //candidature 
      {
        path : 'candidature',
       children : [
        { path : '' , component : CandidatureComponent},
        { path : 'update-candidature/:id' , component : UpdateCandidatureComponent}
       ]
      },

      // all-news (categories, medias, newposte)
      {
        path: 'all-news',
        children: [
          {
            path: 'categories',
            children: [
              { path: '', component: CategoriesComponent },
              { path: 'add-categorie', component: AddCategorieComponent },
              { path: 'update-categorie', component: UpdateCategorieComponent }
            ]
          },
          {
            path: 'medias',
            component: MediasComponent,
          },
          {
            path: 'newposte',
            children: [
              { path: '', component: NewPosteComponent },
              { path: 'add-poste', component: AddNewsComponent },
              { path : 'update-poste' , component : UpdateNewsComponent},
              { path : 'news-details',component : ViewNewsComponent}
            ]
          }
        ]
      },

      {
        path: 'admins',
        //data: { activeFilter: 'users' },
        children: [
          {
            path: '',
            component: AdminsComponent,
          },
          {
            path: 'details/:id',
            component: ViewAdminComponent,
          },
        ],
      },

      // Offre emploi
      {
        path: 'offre-emploi',
        children: [
          {
            path: 'modules',
            children: [
              { path: '', component: ModulesComponent },
              { path: 'add-module', component: AddModuleComponent },
              { path : 'edit-module', component: EditModuleComponent}
            ],
            
          },
          {
            path: 'qcms',
            component: QcmsComponent
          },
    
          // Fiches
          {
            path: 'fiches',
            component: FichesComponent
          }
        ],
      }, 
       // QCMS

       {
        path :'appointments',
        component : AppointmentsComponent
       },

       // gestion de publicités 

       {
        path :'publicites',
        children :[
        {  path :'', component :PubliciteComponent },
        { path :'add-publicites' ,component : AddPublicitesComponent},
        { path :'update-publicites/:id'  ,  component :UpdatePublicitesComponent}
        ]
       },
       // Partie gestion de messagerie 
       {
        path :'messagerie',
        component : MessagerieComponent
       }
    

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackadminRoutingModule { }
