import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 public tournamentList:any[]=[];
  constructor(private _service:DashboardService) { }

  ngOnInit(): void {
   this.getTournamentdetails();
  }
  getTournamentdetails(){
    this._service.getTournament().subscribe(res=>{
      this.tournamentList=Object.values(res);
      console.log(this.tournamentList);
      
        
      });
  
    }
  }




