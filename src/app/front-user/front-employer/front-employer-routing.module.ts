import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerLayoutComponent } from './employer-layout/employer-layout.component';
import { AuthComponent } from '../employer/auth/auth.component';
import { DashboardEmployerComponent } from './dashboard-employer/dashboard-employer.component';
import { AjoutOffreComponent } from './ajout-offre/ajout-offre.component';
import { AuthEmployeurGuard } from './guards/auth-employeur.guard';
import { GuestEmployerGuard } from './guards/guest-employer.guard';
import { CandidatsEmployerComponent } from './candidats-employer/candidats-employer.component';
import { RendezVousEmployerComponent } from './rendez-vous-employer/rendez-vous-employer.component';
import { MessagerieEmployerComponent } from './messagerie-employer/messagerie-employer.component';
import { ConversationsEmployerComponent } from './conversations-employer/conversations-employer.component';
import { NotificationsEmployerComponent } from './notifications-employer/notifications-employer.component';
import { ProfileEmployerComponent } from './profile-employer/profile-employer.component';

const routes: Routes = [
  {
    path: '',
    component: EmployerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboardEmployer', pathMatch: 'full' },
      { path: 'dashboardEmployer', component: DashboardEmployerComponent },
      { path: 'ajout-offre', component: AjoutOffreComponent },
      { path: 'candidats-employer', component: CandidatsEmployerComponent },
      { path: 'rendez-vous-employer', component: RendezVousEmployerComponent },
      { path: 'messagerie-employer', component: MessagerieEmployerComponent },
      { path: 'messagerie-employer/conversations-employer/:id', component: ConversationsEmployerComponent },
      { path: 'notifications-employer', component: NotificationsEmployerComponent },
      { path: 'employer-profile', component: ProfileEmployerComponent },
      { path: 'register-employer', component: AuthComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontEmployerRoutingModule { }
