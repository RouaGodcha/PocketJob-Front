import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BackadminRoutingModule } from './backadmin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SharedModule } from 'primeng/api';
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

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    ResetComponent,
    ForgetComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
   
  ],
  imports: [
    CommonModule,
    BackadminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    SharedModule,
    SlickCarouselModule,
    DialogModule,
    TableModule,
    DropdownModule,
    SkeletonModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    NgbDatepickerModule,
  NgbNavModule,
    InputNumberModule,
    FieldsetModule,
    DialogModule,
    SplitterModule,
    CheckboxModule,
    AutoCompleteModule,
    AvatarModule,
    BrowserAnimationsModule ,
    CardModule,
    NgbDatepickerModule,
    NgbNavModule,
    SelectButtonModule,
    RadioButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    DragDropModule,
    TooltipModule ,
    TabViewModule,
    ColorPickerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [DatePipe],
})
export class BackadminModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
