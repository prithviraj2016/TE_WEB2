import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './tournaments.component.html'
})
export class TournamentsComponent implements OnInit {
  // public tournamentList:any=[];
  public hype:any=[];
  constructor(private _service:DashboardService) {}

  ngOnInit() {

  this.getTournamentdetails()
}
getTournamentdetails(){
  this._service.getTournament().subscribe(res =>{
    // let tournamentList=Object.values(res);
    
     
     
   let tournamentList=res;
    
    console.log(tournamentList);
     
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
