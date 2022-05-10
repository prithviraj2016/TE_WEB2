import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
seasonList:any=[];
public hype:any=[];
public tournamentList:any=[];
userID:String="";
userName:string="";
loggedinUser:any;

constructor( private service:DashboardService) { }

  ngOnInit(): void {
    this.getSeason();
    this.getTournamentdetails();
  }
getSeason(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getSeason(this.userID).subscribe(res =>{
    if(res){
    this.seasonList = Object.values(res)[2];
     console.log(this.seasonList);
    }
  });
}

getTournamentdetails(){
  this.service.getTournament().subscribe(res =>{
  var tournamentList=Object.values(res);
  this.hype=JSON.parse(JSON.stringify(tournamentList))[2];
 
   console.log(this.hype);
     
    });
        
      }
}
