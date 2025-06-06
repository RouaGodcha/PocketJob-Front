import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgChartsModule } from 'ng2-charts';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { JwtInterceptor } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { BackadminRoutingModule } from './backadmin-routing.module';
import { SharedModule } from './shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';
import { AdminsComponent } from './admins/admins.component';
import { UpdateAdminComponent } from './admins/update-admin/update-admin.component';
import { UpdatePasswordComponent } from './admins/update-password/update-password.component';
import { ViewAdminComponent } from './admins/view-admin/view-admin.component';
import { ForgetComponent } from './auth/forget/forget/forget.component';
import { LoginComponent } from './auth/login/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { AddCandidatComponent } from './candidat/add-candidat/add-candidat.component';
import { CandidatComponent } from './candidat/candidat.component';
import { UpdateCandidatComponent } from './candidat/update-candidat/update-candidat.component';
import { ViewCandidatComponent } from './candidat/view-candidat/view-candidat.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { UpdateCandidatureComponent } from './candidature/update-candidature/update-candidature.component';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateCategorieComponent } from './categories/update-categorie/update-categorie.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployerComponent } from './employeur/add-employer/add-employer.component';
import { EmployeurComponent } from './employeur/employeur.component';
import { UpdateEmployerComponent } from './employeur/update-employer/update-employer.component';
import { ViewEmployeurComponent } from './employeur/view-employeur/view-employeur.component';
import { FichesComponent } from './fiches/fiches.component';
import { MediasComponent } from './medias/medias.component';
import { ViewMediaComponent } from './medias/view-media/view-media.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { EditModuleComponent } from './modules/edit-module/edit-module.component';
import { ModulesComponent } from './modules/modules.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddNewsComponent } from './new-poste/add-news/add-news.component';
import { NewPosteComponent } from './new-poste/new-poste.component';
import { UpdateNewsComponent } from './new-poste/update-news/update-news.component';
import { ViewNewsComponent } from './new-poste/view-news/view-news.component';
import { AddPostesComponent } from './postes/add-postes/add-postes.component';
import { PostesComponent } from './postes/postes.component';
import { UpdatePostesReactionComponent } from './postes/update-postes-reaction/update-postes-reaction.component';
import { UpdatePostesComponent } from './postes/update-postes/update-postes.component';
import { AddPublicitesComponent } from './publicite/add-publicites/add-publicites.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { UpdatePublicitesComponent } from './publicite/update-publicites/update-publicites.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { SwitchButtonComponent } from './shared/switch-button/switch-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user.component';

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
    AddEmployerComponent,
    AddCandidatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgChartsModule,
    SlickCarouselModule,
    SharedModule,
    BackadminRoutingModule,
    InputTextModule,
    DialogModule,
    TableModule,
    DropdownModule,
    SkeletonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    InputNumberModule,
    FieldsetModule,
    SplitterModule,
    CheckboxModule,
    AutoCompleteModule,
    AvatarModule,
    CardModule,
    SelectButtonModule,
    RadioButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    DragDropModule,
    TooltipModule,
    TabViewModule,
    ToastModule,
    PanelModule,
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
    DatePipe,
    MessageService,
  ],
})
export class BackadminModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}