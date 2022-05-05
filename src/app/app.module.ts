
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';

import { SidebarModule } from './sidebar/sidebar.module';
import { SignInComponent } from './account/signin/sign-in.component';
import { SignUpComponent } from './account/signup/sign-up.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { GlobalErrorHandler } from './shared/services/globalErrorHandler';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { httpInterceptorProviders } from './common/services/httpInterceptorProviders';
import { AuthGuard } from './common/services/auth-guard.service';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { ModalModule, TabsModule } from 'ngx-foundation';








@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeLayoutComponent,
    UserLayoutComponent,
    
   
  

  ],
  imports: [
    BrowserModule,
    RouterModule,
    NavbarModule,
    FooterModule,
    AppRoutingModule,
    CommonModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SlideToggleModule,
    TabsModule.forRoot(),
  ],
  providers:[
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    AuthGuard,
    httpInterceptorProviders
  ],
  bootstrap: [
    AppComponent

  ]
})
export class AppModule { }
