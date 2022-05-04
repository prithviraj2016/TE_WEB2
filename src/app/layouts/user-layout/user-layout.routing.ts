import { EditTournamentComponent } from 'src/app/users/edit-tournament/edit-tournament.component';
import { EditSeasonComponent } from 'src/app/users/edit-season/edit-season.component';
import { EditEventComponent } from 'src/app/users/edit-event/edit-event.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/users/dashboard/dashboard.component';
import { EventCreateComponent } from 'src/app/users/event-create/event-create.component';
import { EventsComponent } from 'src/app/users/events/events.component';
import { ProfileComponent } from 'src/app/users/profile/profile.component';
import { SeasonCreateComponent } from 'src/app/users/season-create/season-create.component';
import { SeasonsComponent } from 'src/app/users/seasons/seasons.component';
import { TeamCreateComponent } from 'src/app/users/team-create/team-create.component';
import { TeamsComponent } from 'src/app/users/teams/teams.component';
import { TournamentCreateComponent } from 'src/app/users/tournament-create/tournament-create.component';
import { ManageStaffComponent } from 'src/app/users/tournaments/manage-staff/manage-staff.component';
import { PoolsComponent } from 'src/app/users/tournaments/pools/pools.component';
import { TournamentsComponent } from 'src/app/users/tournaments/tournaments.component';
import { EditTeamComponent } from 'src/app/users/edit-team/edit-team.component';
import { ManageTournamentsComponent } from 'src/app/users/manage-tournaments/manage-tournaments.component';
import { ManageEventComponent } from 'src/app/users/manage-event/manage-event.component';
import { ManagePlayersComponent } from 'src/app/users/manage-players/manage-players.component';
import { ManagePlayersTeamComponent } from 'src/app/users/manage-players-team/manage-players-team.component';




export const UserLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, },
    { path: 'tournaments', component: TournamentsComponent },
    { path: 'events', component: EventsComponent },
    { path: 'event-create', component: EventCreateComponent},
    { path: 'seasons', component: SeasonsComponent },
    { path: 'season-create', component: SeasonCreateComponent},
    { path: 'teams', component: TeamsComponent },
    { path:'team-create', component:TeamCreateComponent},
    { path: 'profile/:id', component: ProfileComponent},
    { path:'tournament-create', component:TournamentCreateComponent},
    { path: 'manage-staff', component: ManageStaffComponent},
    { path: 'pools', component: PoolsComponent},
    { path:'edit-event', component:EditEventComponent},
    { path:'edit-season', component:EditSeasonComponent},
    { path:'edit-team', component:EditTeamComponent},
    { path:'edit-tournament', component:EditTournamentComponent},
    {path:'manage-tournaments',component:ManageTournamentsComponent},
    {path:'manage-event',component:ManageEventComponent},
    {path:'manage-players',component:ManagePlayersComponent},
    {path:'manage=players-team', component:ManagePlayersTeamComponent}

];
