import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DropdownModule } from 'primeng/dropdown';
import { AjoutOffreComponent } from './ajout-offre/ajout-offre.component';
import { CandidatsEmployerComponent } from './candidats-employer/candidats-employer.component';
import { ConversationsEmployerComponent } from './conversations-employer/conversations-employer.component';
import { DashboardEmployerComponent } from './dashboard-employer/dashboard-employer.component';
import { EmployerLayoutComponent } from './employer-layout/employer-layout.component';
import { FrontEmployerRoutingModule } from './front-employer-routing.module';
import { MessagerieEmployerComponent } from './messagerie-employer/messagerie-employer.component';
import { NavbarEmployerComponent } from './navbar-employer/navbar-employer.component';
import { NotificationsEmployerComponent } from './notifications-employer/notifications-employer.component';
import { ProfileEmployerComponent } from './profile-employer/profile-employer.component';
import { RendezVousEmployerComponent } from './rendez-vous-employer/rendez-vous-employer.component';
import { SidebarEmployerComponent } from './sidebar-employer/sidebar-employer.component';

@NgModule({
  declarations: [
    EmployerLayoutComponent,
    NavbarEmployerComponent,
    SidebarEmployerComponent,
    DashboardEmployerComponent,
    AjoutOffreComponent,
    CandidatsEmployerComponent,
    RendezVousEmployerComponent,
    MessagerieEmployerComponent,
    ConversationsEmployerComponent,
    NotificationsEmployerComponent,
    ProfileEmployerComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FrontEmployerRoutingModule,
    DropdownModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    RouterModule,
  ]
})
export class FrontEmployerModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
