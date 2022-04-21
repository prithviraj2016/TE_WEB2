import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './account/signin/sign-in.component';
import { SignUpComponent } from './account/signup/sign-up.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard } from './shared/services/auth-guard.service';

const routes: Routes = [

  {
    path: '',

    component: HomeLayoutComponent,
    children: [
        {
          path: '',
          loadChildren: () => import('./layouts/home-layout/home-layout.module').then(module => module.HomeLayoutModule)
        }
    ]
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
          path: '',
          loadChildren: () => import('./layouts/user-layout/user-layout.module').then(module => module.UserLayoutModule)
        }
    ]
  },
  {
    path: 'signin',
    component: SignInComponent
   },
   {
    path: 'signup',
    component: SignUpComponent
   },
  {
    path: '**',
    redirectTo: 'signin'
  },
 

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
