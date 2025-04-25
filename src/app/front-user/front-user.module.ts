import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontUserRoutingModule } from './front-user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { HomeRegisterComponent } from './auth/register/home-register/home-register.component';
import { OffresEmploiComponent } from './offres-emploi/offres-emploi.component';
import { ReservationComponent } from './auth/register/home-register/reservation/reservation.component';
import { BackadminRoutingModule } from '../backadmin/backadmin-routing.module';
import { OffreDetailsComponent } from './offres-emploi/pages/offre-details/offre-details.component';
import { DashboardCandidatComponent } from './User/dashboard-candidat/dashboard-candidat.component';
import { CandidatureListComponent } from './User/candidature-list/candidature-list.component';
import { CvComponent } from './User/cv/cv.component';
import { MessagesComponent } from './User/messages/messages.component';
import { NavbarCandidatComponent } from './User/navbar-candidat/navbar-candidat.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'primeng/api';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitterModule } from 'primeng/splitter';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserLayoutComponent } from './User/user-layout/user-layout.component';
import { SidebarCandidatComponent } from './User/sidebar-candidat/sidebar-candidat.component';
import { AuthComponent } from './employer/auth/auth.component';
import { OffresComponent } from './User/offres/offres.component';
import { VosEmploiComponent } from './User/vos-emploi/vos-emploi.component';
import { NewsComponent } from './User/news/news.component';
import { ChatInputComponent } from './User/messages/chat-input/chat-input.component';
import { ConversationListComponent } from './User/messages/conversation-list/conversation-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FrontLayoutComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HomeRegisterComponent,
    OffresEmploiComponent,
    ReservationComponent,
    OffreDetailsComponent,
    DashboardCandidatComponent,
    CandidatureListComponent,
    CvComponent,
    MessagesComponent,
    NavbarCandidatComponent,
    UserLayoutComponent,
    SidebarCandidatComponent,
    AuthComponent,
    OffresComponent,
    VosEmploiComponent,
    NewsComponent,
    ChatInputComponent,
    ConversationListComponent,

    
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
    FrontUserRoutingModule,
    SlickCarouselModule,
    TableModule,
    SkeletonModule,
    ButtonModule,
    RippleModule,
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
  exports: [
    ChatInputComponent // optionnel si tu veux le réutiliser ailleurs
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class FrontUserModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
