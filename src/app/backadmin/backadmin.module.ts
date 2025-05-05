import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BackadminRoutingModule } from './backadmin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 👇 Ce module est OBLIGATOIRE pour que <canvas baseChart> fonctionne
import { NgChartsModule } from 'ng2-charts';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './auth/login/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ForgetComponent } from './auth/forget/forget/forget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DragDropModule } from 'primeng/dragdrop';
import { TabViewModule } from 'primeng/tabview';
import { ColorPickerModule } from 'primeng/colorpicker';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TooltipModule } from 'primeng/tooltip';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { PostesComponent } from './postes/postes.component';
import { AddPostesComponent } from './postes/add-postes/add-postes.component';
import { UpdatePostesComponent } from './postes/update-postes/update-postes.component';
import { UpdatePostesReactionComponent } from './postes/update-postes-reaction/update-postes-reaction.component';
import { CategoriesComponent } from './categories/categories.component';
import { MediasComponent } from './medias/medias.component';
import { NewPosteComponent } from './new-poste/new-poste.component';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './categories/update-categorie/update-categorie.component';
import { ViewMediaComponent } from './medias/view-media/view-media.component';
import { SharedModule } from './shared/shared.module';
import { AddNewsComponent } from './new-poste/add-news/add-news.component';
import { UpdateNewsComponent } from './new-poste/update-news/update-news.component';
import { ViewNewsComponent } from './new-poste/view-news/view-news.component';
import { ModulesComponent } from './modules/modules.component';
import { QcmsComponent } from './qcms/qcms.component';
import { FichesComponent } from './fiches/fiches.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { EditModuleComponent } from './modules/edit-module/edit-module.component';
import { CandidatComponent } from './candidat/candidat.component';
import { RouterModule } from '@angular/router';
import { AddCandidatComponent } from './candidat/add-candidat/add-candidat.component';
import { UpdateCandidatComponent } from './candidat/update-candidat/update-candidat.component';
import { ViewCandidatComponent } from './candidat/view-candidat/view-candidat.component';
import { EmployeurComponent } from './employeur/employeur.component';
import { AddEmployerComponent } from './employeur/add-employer/add-employer.component';
import { SwitchButtonComponent } from './shared/switch-button/switch-button.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { UpdateEmployerComponent } from './employeur/update-employer/update-employer.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { UpdateCandidatureComponent } from './candidature/update-candidature/update-candidature.component';
import { PanelModule } from 'primeng/panel';

// 📌 Import en haut du fichier
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';
import { UpdateAdminComponent } from './admins/update-admin/update-admin.component';
import { ViewAdminComponent } from './admins/view-admin/view-admin.component';
import { UpdatePasswordComponent } from './admins/update-password/update-password.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { AddPublicitesComponent } from './publicite/add-publicites/add-publicites.component';
import { UpdatePublicitesComponent } from './publicite/update-publicites/update-publicites.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { ViewEmployeurComponent } from './employeur/view-employeur/view-employeur.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    ResetComponent,
    ForgetComponent,
    SidebarComponent,
    NavbarComponent,
    UserComponent,
    UpdateUserComponent,
    AddUserComponent,
    PostesComponent,
    AddPostesComponent,
    UpdatePostesComponent,
    UpdatePostesReactionComponent,
    CategoriesComponent,
    MediasComponent,
    NewPosteComponent,
    AddCategorieComponent,
    UpdateCategorieComponent,
    ViewMediaComponent,
    AddNewsComponent,
    UpdateNewsComponent,
    ViewNewsComponent,
    ModulesComponent,
    QcmsComponent,
    FichesComponent,
    AddModuleComponent,
    EditModuleComponent,
    CandidatComponent,
    AddCandidatComponent,
    UpdateCandidatComponent,
    ViewCandidatComponent,
    EmployeurComponent,
    AddEmployerComponent,
    SwitchButtonComponent,
    ConfigurationsComponent,
    UpdateEmployerComponent,
    CandidatureComponent,
    UpdateCandidatureComponent,
    AdminsComponent,
    AddAdminComponent,
    UpdateAdminComponent,
    ViewAdminComponent,
    UpdatePasswordComponent,
    DashboardComponent,
    PubliciteComponent,
    AddPublicitesComponent,
    UpdatePublicitesComponent,
    MessagerieComponent,
    ViewEmployeurComponent,
    RendezVousComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    PanelModule,
    NgChartsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackadminRoutingModule,
    SharedModule,
    SlickCarouselModule,
    TableModule,
    DialogModule,
    SkeletonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    NgbDatepickerModule,
    NgbNavModule,
    InputNumberModule,
    FieldsetModule,
    SplitterModule,
    CheckboxModule,
    AutoCompleteModule,
    AvatarModule,
    DialogModule,
    AutoCompleteModule,
    BrowserAnimationsModule ,
    CardModule,
    NgbDatepickerModule,
    NgbNavModule,
    SelectButtonModule,
    RadioButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    DragDropModule,
    TooltipModule ,
    TabViewModule,
    ToastModule,
    ColorPickerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  
  providers: [
    DatePipe ,
    MessageService 
  ],
})
export class BackadminModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
