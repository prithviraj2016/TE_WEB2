
import { HttpClientModule } from '@angular/common/http';
import { TournamentCreateComponent} from 'src/app/users/tournament-create/tournament-create.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxCopyPasteModule} from 'ngx-copypaste';

import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserLayoutRoutes } from './user-layout.routing';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule, } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DashboardComponent } from 'src/app/users/dashboard/dashboard.component';
import { ModalModule, TabsModule } from 'ngx-foundation';
import { TournamentsComponent } from 'src/app/users/tournaments/tournaments.component';
import { EventsComponent } from 'src/app/users/events/events.component';
import { SeasonsComponent } from 'src/app/users/seasons/seasons.component';
import { TeamsComponent } from 'src/app/users/teams/teams.component';
import { ProfileComponent } from 'src/app/users/profile/profile.component';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { EventCreateComponent } from 'src/app/users/event-create/event-create.component';
import { SeasonCreateComponent } from 'src/app/users/season-create/season-create.component';
import { TeamCreateComponent } from 'src/app/users/team-create/team-create.component';
import { ManageStaffComponent } from 'src/app/users/tournaments/manage-staff/manage-staff.component';
import { PoolsComponent } from 'src/app/users/tournaments/pools/pools.component';
import { EditTournamentComponent } from 'src/app/users/edit-tournament/edit-tournament.component';
import { EditEventComponent } from 'src/app/users/edit-event/edit-event.component';
import { EditSeasonComponent } from 'src/app/users/edit-season/edit-season.component';
import { EditTeamComponent } from 'src/app/users/edit-team/edit-team.component';
import { DynamicScriptLoaderService } from 'src/app/common/services/dynamic-script-load-service';
import { ManageTournamentsComponent } from 'src/app/users/manage-tournaments/manage-tournaments.component';
import { ManagePlayersComponent } from 'src/app/users/manage-players/manage-players.component';
import { ImageCropperModule} from 'ngx-image-cropper';
import { ManagePlayersTeamComponent } from './../../users/manage-players-team/manage-players-team.component';
// import { AngularFileUploaderModule } from "angular-file-uploader";


// import { IconImportModule } from 'mat-icon-import';
//import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    // IconImportModule,
    // LbdModule,
    // InfiniteScrollModule,
    //NgxDaterangepickerMd.forRoot(),
     TabsModule.forRoot(),
    SlickCarouselModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDatepickerModule,
    SlideToggleModule,
    MatNativeDateModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ImageCropperModule,
    
   
    NgxCopyPasteModule
    // AngularFileUploaderModule,


   

    
    // MatTabsModule
  ],
  declarations: [
    DashboardComponent,
    TournamentsComponent,
    EventsComponent,
    SeasonsComponent,
    TeamsComponent,
    ProfileComponent,
    EventCreateComponent,
    SeasonCreateComponent,
    SeasonsComponent,
    TeamsComponent,
    TeamCreateComponent,
    TournamentCreateComponent,
    ManageStaffComponent,
    PoolsComponent,
    EditTournamentComponent,
    EditEventComponent,
    EditSeasonComponent,
    EditTeamComponent,
    ManageTournamentsComponent,
    ManagePlayersComponent,
    ManagePlayersTeamComponent
    
  ],
  providers: [
    DynamicScriptLoaderService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class UserLayoutModule {}
