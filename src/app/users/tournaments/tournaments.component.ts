import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './tournaments.component.html'
})
export class TournamentsComponent implements OnInit {
  public tournamentList:any=[];
  public hype:any=[];
  constructor(private _service:DashboardService) {}

  ngOnInit() {

  this.getTournamentdetails()
}
getTournamentdetails(){
  this._service.getTournament().subscribe(res =>{
  var tournamentList=Object.values(res);
  this.hype=JSON.parse(JSON.stringify(tournamentList))[2];
   console.log(this.hype);
     
    });
        
      }
    openModal(template: TemplateRef<any>) {
      
    }

    hypeNow(){

    }

// hype tabs js

showtab()
{
  // console.log(evt);

  // evt.classList.add("active");

	// var tab=tabs;
	// switch(tab) //this switch case replaces the tabContent
  //   {
  //     case "packages":
  //       document.getElementById("packages").style.display = "block";
  //       document.getElementById("national-packages").style.display = "none";
  //       break;
  //     case "national-packages":
  //    document.getElementById("national-packages").style.display = "block";
  //    document.getElementById("packages").style.display = "none";
  //       break;

  //   }
}

}
function hyeps(arg0: any, hyeps: any) {
  throw new Error('Function not implemented.');
}

