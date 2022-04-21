
import { Routes } from '@angular/router';
import { AboutUsComponent } from 'src/app/home/aboutus/aboutus.component';
import { ContactusComponent } from 'src/app/home/contactus/contactus.component';

import { FaqComponent } from 'src/app/home/faq/faq.component';
import { FeaturesComponent } from 'src/app/home/features/features.component';
import { IndexComponent } from 'src/app/home/index/index.component';
import { PrivacyComponent } from 'src/app/home/privacy/privacy.component';
import { SiteMapComponent } from 'src/app/home/sitemap/sitemap.component';
import { TermsComponent } from 'src/app/home/terms/terms.component';


export const HomeLayoutRoutes: Routes = [
    { path: '',              component: IndexComponent },
    { path:'contactus',               component:ContactusComponent},
    { path: 'features',      component: FeaturesComponent },
    { path: 'faq',           component: FaqComponent },
    { path: 'privacy',       component: PrivacyComponent },
    { path: 'terms',         component: TermsComponent },
    { path: 'aboutus',       component: AboutUsComponent },
    { path: 'sitemap',       component: SiteMapComponent }
];
