import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamList:any=[];
  public hype:any=[];
  public tournamentList:any=[];
  userID:String="";
  userName:string="";
  loggedinUser:any;

  constructor(private service:DashboardService) { }

  ngOnInit(): void {
    this.getTeamDetails();
  }
  getTeamDetails(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    this.userName=JSON.parse(this.loggedinUser).username;
    this.service.getTeam(this.userID).subscribe(res =>{
      if(res){
      this.teamList = Object.values(res);
       console.log(this.teamList);
      }
    });
}
}
