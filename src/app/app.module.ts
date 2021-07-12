import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { HomeComponent } from './features/home/home.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LogisticComponent } from './features/logistic/logistic.component';
import { LeasingComponent } from './features/leasing/leasing.component';
import { ContactComponent } from './features/contact/contact.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import {  DecimalPipe } from '@angular/common';
import { AdminNavbarComponent } from './core/components/admin-navbar/admin-navbar.component';
import { SandroneComponent } from './shared/sandrone/sandrone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LogisticComponent,
    LeasingComponent,
    ContactComponent,
    NotfoundComponent,
    AlertComponent,
    AdminNavbarComponent,
    SandroneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    DecimalPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
