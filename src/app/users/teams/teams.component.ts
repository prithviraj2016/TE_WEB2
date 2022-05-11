import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamList:any=[];
  teamList1:any=[];
  public hype:any=[];
  public hype1:any=[];
  public tournamentList:any=[];
  userID:String="";
  userName:string="";
  loggedinUser:any;

  constructor(private service:DashboardService) { }

  ngOnInit(): void {
    this.getTeamDetails();
    this.getTeamList();
  }
  getTeamDetails(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    this.userName=JSON.parse(this.loggedinUser).username;
    this.service.getTeam(this.userID).subscribe(res =>{
      if(res){
      this.teamList = Object.values(res);
      this.hype = JSON.parse(JSON.stringify(this.teamList));
       console.log(this.teamList);
      }
    });
}
getTeamList(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getTeamList().subscribe(res =>{
    if(res){
    this.teamList1 = Object.values(res);
    this.hype1 = JSON.parse(JSON.stringify(this.teamList1));
     console.log(this.teamList1);
    }
  });
}
}
