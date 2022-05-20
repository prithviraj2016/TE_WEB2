import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.css']
})
export class ManageTournamentsComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  public tournamentList:any=[];
  public tournamentList1:any=[];
  public seasonList:any=[];
  seasonID:any;
  public hype:any=[];
  public hype1:any=[];
  public hype2:any=[];
  List:any=[];
  userID:String="";
  loggedinUser:any;
  userName:String;

  constructor(private _service:DashboardService) { 
    this.imageUrl=environment.imageUrl;
  }

  ngOnInit(): void {
    this.getTournamentdetails();
    this.addTournaments(this.seasonID);
    this.getSeason();
    
    
  }
  getSeason(){
    this._service.getSeason(this.seasonID).subscribe(res =>{
      if(res){
      this.seasonList = Object.values(res);
      this.List=JSON.parse(JSON.stringify(this.seasonList));
      console.log(this.hype2);
      
      }
    });
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
  addTournaments(id:any){
    this._service.addTournaments(id).subscribe(res =>{
      
      var tournamentList1=Object.values(res);
      this.hype1=JSON.parse(JSON.stringify(tournamentList1));
      
    
       console.log(this.hype1);
      });
  }
  
}
