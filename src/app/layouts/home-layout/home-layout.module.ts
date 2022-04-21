import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactusComponent } from './../../home/contactus/contactus.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeLayoutRoutes } from './home-layout.routing';

import { IndexComponent } from 'src/app/home/index/index.component';
import { TermsComponent } from 'src/app/home/terms/terms.component';
import { PrivacyComponent } from 'src/app/home/privacy/privacy.component';
import { FeaturesComponent } from 'src/app/home/features/features.component';

import { AboutUsComponent } from 'src/app/home/aboutus/aboutus.component';
import { SiteMapComponent } from 'src/app/home/sitemap/sitemap.component';
import { FaqComponent } from 'src/app/home/faq/faq.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DynamicScriptLoaderService } from 'src/app/common/services/dynamic-script-load-service';
// import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgbModule
  ],
  declarations: [
    IndexComponent,
    TermsComponent,
    PrivacyComponent,
    FeaturesComponent,
    ContactusComponent,
    AboutUsComponent,
    FaqComponent,
    SiteMapComponent
  ],
  exports: [
    
  ],
  providers: [
    DynamicScriptLoaderService
  ]
})

export class HomeLayoutModule {}
