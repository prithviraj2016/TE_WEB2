import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
seasonList:any=[];
eventList:any=[];
public hype:any=[];
public hype1:any=[];
public hype2:any=[];
public tournamentList:any=[];
userID:String="";
userName:string="";
loggedinUser:any;

constructor( private service:DashboardService) { }

  ngOnInit(): void {
    this.getSeason();
    this.getTournamentdetails();
    this.getLatestSeason();
    this.getEventdetails();
  }
getSeason(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getSeason(this.userID).subscribe(res =>{
    if(res){
    this.seasonList = Object.values(res);
    this.hype=JSON.parse(JSON.stringify(this.seasonList))[2];
    console.log(this.seasonList);
    }
  });
}
getLatestSeason(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getSeason(this.userID).subscribe(res =>{
    if(res){
    this.seasonList = Object.values(res);
    this.hype1=JSON.parse(JSON.stringify(this.seasonList))[2][0];
    console.log(this.seasonList);
    }
  });
}
getEventdetails(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getEvent(this.userID).subscribe(res=>{
    if(res){
    this.eventList=Object.values(res);
    this.hype2=JSON.parse(JSON.stringify(this.eventList))[2];
    console.log(this.hype2);
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
