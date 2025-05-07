import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgChartsModule } from 'ng2-charts';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'primeng/api';
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
import { BackadminRoutingModule } from '../backadmin/backadmin-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { HomeRegisterComponent } from './auth/register/home-register/home-register.component';
import { ReservationComponent } from './auth/register/home-register/reservation/reservation.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AuthComponent } from './employer/auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { FrontUserRoutingModule } from './front-user-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OffresEmploiComponent } from './offres-emploi/offres-emploi.component';
import { OffreDetailsComponent } from './offres-emploi/pages/offre-details/offre-details.component';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { DashboardCandidatComponent } from './User/dashboard-candidat/dashboard-candidat.component';
import { InviteComponent } from './User/invite/invite.component';
import { ChatInputComponent } from './User/messages/chat-input/chat-input.component';
import { ChatWindowComponent } from './User/messages/chat-window/chat-window.component';
import { ConversationListComponent } from './User/messages/conversation-list/conversation-list.component';
import { MessagesComponent } from './User/messages/messages.component';
import { NavbarCandidatComponent } from './User/navbar-candidat/navbar-candidat.component';
import { NewsComponent } from './User/news/news.component';
import { OffresComponent } from './User/offres/offres.component';
import { ProfilComponent } from './User/profil/profil.component';
import { SidebarCandidatComponent } from './User/sidebar-candidat/sidebar-candidat.component';
import { UserLayoutComponent } from './User/user-layout/user-layout.component';
import { VosEmploiComponent } from './User/vos-emploi/vos-emploi.component';


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
    ProfilComponent,
    InviteComponent,
    ChatWindowComponent,
    ChatbotComponent,
   
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    PanelModule,
    NgChartsModule,
    RouterModule,
    SafeUrlPipe,
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
    // BrowserAnimationsModule ,
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
    ChatInputComponent,  // optionnel si tu veux le réutiliser ailleurs
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class FrontUserModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
