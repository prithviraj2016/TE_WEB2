import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  teamList:any=[];
  teamListplayers:any=[];
  selectedTeamID:any;
  selectedTeamDetails:any;
  selectedTeamplayers:any=[];
  public tournamentList:any=[];
  userID:String="";
  userName:string="";
  loggedinUser:any;
  public show:boolean =false;
public searchList : any[];
public search1:any=[];

  selectedTeam:any;

  constructor(private service:DashboardService) { 
    this.imageUrl=environment.imageUrl
  }

  ngOnInit(): void {
    this.getTeam();
   
  }
  getTeam(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    this.userName=JSON.parse(this.loggedinUser).username;
    this.service.getTeam(this.userID).subscribe((res:any) =>{
      if(res){
        this.teamList = res.set;
        this.teamListplayers = res.players;
      }
      console.log( this.teamList);
      console.log( this.teamListplayers);
      
    });
}
onSelect(item:any){
  // this.service.getTeam(item);
  this.selectedTeam=item;
  this.selectedTeamID = item.teamID;
  
  console.log(this.selectedTeam);
 this.getTeamDetails(this.selectedTeamID);
}


getTeamDetails(teamID:string){
  this.service.getTeamID(teamID).subscribe((res:any) =>{
    if(res){
    this.selectedTeam = res;
    this.selectedTeamDetails = res.adminDetails;
    this.selectedTeamplayers = res.players;
    console.log(this.selectedTeam);
    console.log(this.selectedTeamDetails);
    console.log(this.selectedTeamplayers);
    }
  });
}

searchTeam(event:any){
  console.log(event.target.value);
  this.service.searchTeam(event.target.value).subscribe(res=>{
    var searchList = Object.values(res);
    this.search1=JSON.parse(JSON.stringify(searchList))[2];
    console.log(this.search1);
    this.show = !this.show;
  })
}
}
