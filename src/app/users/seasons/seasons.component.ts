import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
seasonList:any;
seasonList1:any;

public tournamentList:any=[];
public tournamentList1:any=[];
userID:String="";
userName:string="";
loggedinUser:any;
public search1:any=[];
addTournamentList:any=[];
public show:boolean =false;
public searchList : any[];

selectedSeason:any;
selectedSeasonID:any;
selectedSeasonEvents:any=[];
selectedSeasonTournaments:any=[];

constructor( private service:DashboardService) {
  this.imageUrl=environment.imageUrl
 }

  ngOnInit(): void {
    this.getSeason();
   }


getSeason(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getSeason(this.userID).subscribe((res:any) =>{
    if(res){
    this.seasonList = res.list;
    
    console.log(this.seasonList);
    
   
      if(this.seasonList.length>0)
      {
        this.getSeasonDetail(this.seasonList[0].seasonID);
      }

    }
  });
}
onSelect(item:any){
  // this.service.getSeason(item);
  this.selectedSeason=item;
  this.selectedSeasonID=item.seasonID;
  console.log(this.selectedSeasonID);
  this.getSeasonDetail(this.selectedSeasonID);
}

getSeasonDetail(seasonId:string)
{
  this.service.getSeasonID(seasonId).subscribe((res:any)=>{
    if(res){
      this.selectedSeason = res;
      this.selectedSeasonEvents = res.events;
      this.selectedSeasonTournaments = res.tournaments;
      this.seasonList1 = res.adminDetails;
      console.log(this.selectedSeason);
      console.log(this.selectedSeasonEvents);
      console.log(this.selectedSeasonTournaments);
      console.log(this.seasonList1);
    }
  });
}
addTournament(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
this.service.addTournaments(this.userID).subscribe(res=>{
  if(res){
    this.addTournamentList = res;
    console.log(this.addTournamentList);
  }
  
});
} 

searchSeason(event:any){
  console.log(event.target.value);
  this.service.searchSeason(event.target.value).subscribe(res=>{
    var searchList = Object.values(res);
    this.search1=JSON.parse(JSON.stringify(searchList))[2];
    console.log(this.search1);
    this.show = !this.show;
  })
}

}
