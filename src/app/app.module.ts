import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackadminModule } from './backadmin/backadmin.module';  // Vérifie le chemin ici
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FrontUserModule } from './front-user/front-user.module';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    FrontUserModule,
    BackadminModule,  // Assure-toi que ce module est bien importé ici
    NgbDatepickerModule,
    NgbNavModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Supprime cette ligne si tu n'as pas besoin de custom elements
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
