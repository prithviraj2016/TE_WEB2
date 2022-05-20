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
  teamList1:any=[];
  public hype:any=[];
  public hype1:any=[];
  public hype2:any=[];
  public hype3:any=[];
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
    this.getTeamDetails();
    this.getTeamList();
  }
  getTeamDetails(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    this.userName=JSON.parse(this.loggedinUser).username;
    this.service.getTeam(this.userID).subscribe(res =>{

      var teamList = Object.values(res);
      this.hype = JSON.parse(JSON.stringify(teamList))[0];
      this.hype2 = JSON.parse(JSON.stringify(teamList))[0][0];
      this.hype3 = JSON.parse(JSON.stringify(teamList))[0];
       console.log(this.hype);
       console.log(this.hype2);
       console.log(this.hype3);
      
    });
}
onSelect(item:any){
  this.service.getTeam(item);
  this.selectedTeam=item;
  console.log(item);
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
