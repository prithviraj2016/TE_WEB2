import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientJsonpModule } from '@angular/common/http';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
seasonList:any;
eventList:any=[];
public hype:any=[];
public hype1:any=[];
public hype2:any=[];
public hype3:any=[];
public tournamentList:any=[];
public tournamentList1:any=[];
userID:String="";
userName:string="";
loggedinUser:any;
public search1:any=[];

public show:boolean =false;
public searchList : any[];
selectedSeason:any;
selectedSeasonID:any;

constructor( private service:DashboardService) {
  this.imageUrl=environment.imageUrl
 }

  ngOnInit(): void {
    this.getSeason();
    this.getTournamentdetails();
    // this.getLatestSeason();
    this.getEventdetails();
    
  }
getSeason(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getSeason(this.userID).subscribe((res:any) =>{
    if(res){
    this.seasonList = res.list;
    console.log(this.hype);
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
      console.log(this.selectedSeason)
    }
  });

}


// onSelect(item:any){
//     this.service.getSeasonID().subscribe(res=>{
//       if(res){
//         this.selectedSeason = Object.values(res);
//         console.log
//       }
//     });
    
//   }
// getLatestSeason(){
//   this.loggedinUser = localStorage.getItem('loggeduser');
//   this.userID=JSON.parse(this.loggedinUser).userID;
//   this.userName=JSON.parse(this.loggedinUser).username;
//   this.service.getSeason(this.userID).subscribe(res =>{
//     if(res){
//     this.seasonList = Object.values(res);
//     this.hype1=JSON.parse(JSON.stringify(this.seasonList))[2][0];
//     // console.log(this.hype1);
//     }
//   });
// }
getEventdetails(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userID=JSON.parse(this.loggedinUser).userID;
  this.userName=JSON.parse(this.loggedinUser).username;
  this.service.getEvent(this.userID).subscribe(res=>{
    if(res){
    this.eventList=Object.values(res);
    this.hype2=JSON.parse(JSON.stringify(this.eventList))[2];
    // console.log(this.hype2);
    }
      
    });
  }

getTournamentdetails(){
  this.service.getTournament().subscribe(res =>{
  var tournamentList=Object.values(res);
  this.hype3=JSON.parse(JSON.stringify(tournamentList))[2];
 
  //  console.log(this.hype3);
     
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
