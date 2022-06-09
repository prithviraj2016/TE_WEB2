import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/users/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';
declare var introJs: any;


@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  //introJS = introJs(); // assigning it to variable
  public tournamentList:any=[];
  public upcomingList:any=[];
  slide:boolean=true;
  public hype:any=[];
  userID:String="";
  loggedinUser:any;
  userName:String;
  constructor(private _service:DashboardService) {
    this.imageUrl=environment.imageUrl

    //console.log(this.introJS)

    // const IntroJs = require('../../../../../../node_modules/intro.js/intro.js');
    // let guide = IntroJs.introJs();

   }

   ngOnInit() {
    this.getTournamentdetails();
    this.getNotifications();
   }
   toggle(){
     this.slide = !this.slide;
   }
   getTournamentdetails(){
    
    this._service.getUpcomingTournaments().subscribe((res:any) =>{
   if(res){
    this.upcomingList=res.upcoming;
    console.log(this.upcomingList);
      }
      });
          
        }
getNotifications(){
this._service.getNotifications().subscribe(res =>{
  var notifications = Object.values(res);
  console.log(notifications);
});
}
        
helpbutton(){
     introJs().start();
            }
    
}



