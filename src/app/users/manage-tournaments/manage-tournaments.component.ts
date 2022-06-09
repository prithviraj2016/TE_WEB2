import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';
declare var introJs: any;

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.css']
})
export class ManageTournamentsComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  
  

  constructor(private _service:DashboardService,private activatedRoute:ActivatedRoute) { 
    this.imageUrl=environment.imageUrl;
  }

  ngOnInit(): void {
  
    this.activatedRoute.queryParams.subscribe(params => {
      const seasonID = params['id'];
      console.log(seasonID);
    });
    
}
// addTournaments(){
//   this._service.addTournaments(seasonID).subscribe(){}
// }
helpButton(){
  introJs().start();
}
 
  
  
}
