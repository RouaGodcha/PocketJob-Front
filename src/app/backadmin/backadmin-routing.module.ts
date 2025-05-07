import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { RoleGuard } from '../_guard/role.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetComponent } from './auth/forget/forget/forget.component';
import { ResetComponent } from './auth/reset/reset.component';
import { LoginComponent } from './auth/login/login/login.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { PostesComponent } from './postes/postes.component';
import { AddPostesComponent } from './postes/add-postes/add-postes.component';
import { UpdatePostesComponent } from './postes/update-postes/update-postes.component';
import { UpdatePostesReactionComponent } from './postes/update-postes-reaction/update-postes-reaction.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './categories/update-categorie/update-categorie.component';
import { MediasComponent } from './medias/medias.component';
import { NewPosteComponent } from './new-poste/new-poste.component';
import { AddNewsComponent } from './new-poste/add-news/add-news.component';
import { UpdateNewsComponent } from './new-poste/update-news/update-news.component';
import { ViewNewsComponent } from './new-poste/view-news/view-news.component';
import { ModulesComponent } from './modules/modules.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { EditModuleComponent } from './modules/edit-module/edit-module.component';
import { FichesComponent } from './fiches/fiches.component';
import { CandidatComponent } from './candidat/candidat.component';
import { AddCandidatComponent } from './candidat/add-candidat/add-candidat.component';
import { UpdateCandidatComponent } from './candidat/update-candidat/update-candidat.component';
import { ViewCandidatComponent } from './candidat/view-candidat/view-candidat.component';
import { EmployeurComponent } from './employeur/employeur.component';
import { AddEmployerComponent } from './employeur/add-employer/add-employer.component';
import { UpdateEmployerComponent } from './employeur/update-employer/update-employer.component';
import { ViewEmployeurComponent } from './employeur/view-employeur/view-employeur.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { UpdateCandidatureComponent } from './candidature/update-candidature/update-candidature.component';
import { AdminsComponent } from './admins/admins.component';
import { ViewAdminComponent } from './admins/view-admin/view-admin.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { AddPublicitesComponent } from './publicite/add-publicites/add-publicites.component';
import { UpdatePublicitesComponent } from './publicite/update-publicites/update-publicites.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

const routes: Routes = [
  {
    path: '',
    children:[
      { path: 'forget', component: ForgetComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'login', component: LoginComponent },
    ],

  },
  {
    path:'',
    component: AdminLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',
         component: DashboardComponent ,
         //canActivate: [AuthGuard, RoleGuard],
         //data: { role: 'admin' },
      },
     
      {
        path: 'users',
        //canActivate: [AuthGuard], // Protect the admin layout
        children: [
          { path: '', component: UserComponent },
          { path: 'add-user', component: AddUserComponent },
          {
            path: 'candidats',
            children: [
              { path: '', component: CandidatComponent },
              { path: 'add-candidat', component: AddCandidatComponent },
              { path: 'update-candidat/:id', component: UpdateCandidatComponent },
              { path: 'view-candidat/:id', component: ViewCandidatComponent },
            ],
          },
          {
            path: 'employers',
            children: [
              { path: '', component: EmployeurComponent },
              { path: 'add-employer', component: AddEmployerComponent },
              { path: 'update-employer/:id', component: UpdateEmployerComponent },
              { path: 'details/:id', component: ViewEmployeurComponent },
            ],
          },
        ],
      },
      {
        path: 'pocketjob',
        children: [
          {
            path: 'postes',
            children: [
              { path: '', component: PostesComponent },
              { path: 'add-postes', component: AddPostesComponent },
              { path: 'update-postes', component: UpdatePostesComponent },
              { path: 'update-postes-react', component: UpdatePostesReactionComponent },
            ],
          },
          {
            path: 'newposte',
            children: [
              { path: '', component: NewPosteComponent },
              { path: 'add-poste', component: AddNewsComponent },
              { path: 'update-poste', component: UpdateNewsComponent },
              { path: 'news-details', component: ViewNewsComponent },
            ],
          },
        ],
      },
      {
        path: 'candidature',
        children: [
          { path: '', component: CandidatureComponent },
          { path: 'update-candidature/:id', component: UpdateCandidatureComponent },
        ],
      },
      {
        path: 'all-news',
        children: [
          {
            path: 'categories',
            children: [
              { path: '', component: CategoriesComponent },
              { path: 'add-categorie', component: AddCategorieComponent },
              { path: 'update-categorie/:id', component: UpdateCategorieComponent },
            ],
          },
          { path: 'medias', component: MediasComponent },
        ],
      },
      {
        path: 'admins',
        children: [
          { path: '', component: AdminsComponent },
          { path: 'details/:id', component: ViewAdminComponent },
        ],
      },
      {
        path: 'offre-emploi',
        children: [
          {
            path: 'modules',
            children: [
              { path: '', component: ModulesComponent },
              { path: 'add-module', component: AddModuleComponent },
              { path: 'edit-offre/:id', component: EditModuleComponent },
            ],
          },
          { path: 'fiches', component: FichesComponent },
        ],
      },
      { path: 'rendez-vous', component: RendezVousComponent },
      {
        path: 'publicites',
        children: [
          { path: '', component: PubliciteComponent },
          { path: 'add-publicites', component: AddPublicitesComponent },
          { path: 'update-publicites/:id', component: UpdatePublicitesComponent },
        ],
      },
      { path: 'messagerie', component: MessagerieComponent },
      {
        path:"configurations",component : ConfigurationsComponent
      }
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackadminRoutingModule {}