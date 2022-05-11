import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './tournaments.component.html'
})
export class TournamentsComponent implements OnInit {
  public tournamentList:any=[];
  public tournamentList1:any=[];
  public hype:any=[];
  public hype1:any=[];
  userID:String="";
  loggedinUser:any;
  userName:String;
  files:any;
  constructor(private _service:DashboardService) {}

  ngOnInit() {
  this.getFiles();
  this.getTournamentdetails();
  this.getLatestTournamentdetails();
}
getTournamentdetails(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userName=JSON.parse(this.loggedinUser).username;
  this.userID=JSON.parse(this.loggedinUser).userID;
  this._service.getTournament().subscribe(res =>{
  var tournamentList=Object.values(res);
  this.hype=JSON.parse(JSON.stringify(tournamentList))[2];

   console.log(this.hype);
     
    });
        
      }
getLatestTournamentdetails(){
  this._service.getTournament().subscribe(res =>{
  var tournamentList1=Object.values(res);
  this.hype1=JSON.parse(JSON.stringify(tournamentList1))[2][0];
      
  console.log(this.hype1);
           
   });
              
 }
 
  loggedin(){
        this.loggedinUser = localStorage.getItem('loggeduser');
       this.userName=JSON.parse(this.loggedinUser).username;
       this.userID=JSON.parse(this.loggedinUser).userID;
       console.log(this.userName);
       return this.loggedinUser;
     }
     getFiles(){
      this._service.getFiles().subscribe(res=>{
        if(res){
          this.files=(res);
          console.log(JSON.stringify(res));
        }
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

