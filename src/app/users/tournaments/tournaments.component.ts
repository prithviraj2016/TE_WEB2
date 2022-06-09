import { environment } from './../../../environments/environment.prod';
import { parse } from 'path';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
declare var introJs: any;

@Component({
  selector: 'app-home',
  templateUrl: './tournaments.component.html'
})
export class TournamentsComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  public tournamentList:any=[];
  public tournamentList1:any=[];
  public hype:any=[];
  public hype1:any=[];
  public search1:any=[];
  userID:String="";
  loggedinUser:any;
  userName:String;
  selectedTournament:any;
  selectedTournamentID:any;
  selectedTournamentplayers:any=[];
  selectedTournamentplayers1:any=[];
  upload1=false;
  public show:boolean =false;
  public searchList : any[];
  constructor(private _service:DashboardService) {
      this.imageUrl=environment.imageUrl
    }
  
 

  ngOnInit(): void  {
  this.getTournament();
}

getTournament(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userName=JSON.parse(this.loggedinUser).username;
  this.userID=JSON.parse(this.loggedinUser).userID;
  this._service.getTournament(this.userID).subscribe((res:any) =>{
  if(res){
    this.tournamentList = res.list;
  }
  
  if(this.tournamentList.length>0) {
      this.getTournamentDetail(this.tournamentList[0].tournamentID);
    }
    });
        
      }
  onSelect(item:any){
    // this._service.getTournament(this.userID);
    this.selectedTournament=item;
    this.selectedTournamentID=item.tournamentID;
    console.log( this.selectedTournament);
    this.getTournamentDetail(this.selectedTournamentID);
      }


      
  getTournamentDetail(tournamentId:string)
{
  this._service.getTournamentID(tournamentId).subscribe((res:any)=>{
    if(res){
      this.selectedTournament = res;
      this.selectedTournamentplayers = res.players;
      for (let i = 0; i <  this.selectedTournamentplayers.length; i++) {
        console.log(this.selectedTournamentplayers[i].player.name)
        
      }
      // this.selectedTournamentplayers1 = this.selectedTournamentplayers.player
      // this.selectedSeasonTournaments = res.tournaments;
      this.tournamentList1 = res.adminDetails;
      console.log(this.selectedTournament);
      console.log(this.selectedTournamentplayers);
      // console.log(this.selectedTournamentplayers1);
      // console.log(this.seasonList1);
    }
  });
}

deleteTournament(tournamentId:string){
  if(this.selectedTournamentID!==""){
    this._service.deleteTournament(this.selectedTournamentID).subscribe((res:any)=>{
      console.log(this.selectedTournamentID);
      if(res){
        alert("Are You Sure For Delete Tournament");
        this.getTournament();
      }else{
        alert("something went wrong");
      }
    })
  }
}
// getLatestTournamentdetails(){
//   this._service.getTournament().subscribe(res =>{
//   var tournamentList1=Object.values(res);
//   this.hype1=JSON.parse(JSON.stringify(tournamentList1))[2][0];
//   console.log(this.hype1);
           
//    });
              
 

 searchTouramament(event:any){
console.log(event.target.value);

 this._service.searchTournament(event.target.value
 ).subscribe(res=>{
   var searchList = Object.values(res);
   this.search1=JSON.parse(JSON.stringify(searchList))[2];
 console.log(this.search1);
 this.show = !this.show;
  })
 }
//  }
 
  loggedin(){
        this.loggedinUser = localStorage.getItem('loggeduser');
       this.userName=JSON.parse(this.loggedinUser).username;
       this.userID=JSON.parse(this.loggedinUser).userID;
       console.log(this.userName);
       return this.loggedinUser;
     }
    //  getFiles(){
    //   this._service.getFiles().subscribe(res=>{
    //     if(res){
          
    //     var files=Object.values(res);
    //     // this.List=JSON.parse(JSON.stringify(files))[2];
    //     //   const parser = new DOMParser();
    //     //   const xml = parser.parseFromString( this.List, 'text/xml');
    //     //   const obj = this.ngxXml2jsonService.xmlToJson(xml);
    //     //   this.objs = obj
    //     //   console.log(this.objs);
          
          
         
    //     }
    //       });
        
    //     }
      
    
    
    openModal(template: TemplateRef<any>) {
      
    }

    hypeNow(){

    }

// hype tabs js

showtab()
{
  // console.log(evt);

  // evt.classList.add("active");

	// var tab=tabs;
	// switch(tab) //this switch case replaces the tabContent
  //   {
  //     case "packages":
  //       document.getElementById("packages").style.display = "block";
  //       document.getElementById("national-packages").style.display = "none";
  //       break;
  //     case "national-packages":
  //    document.getElementById("national-packages").style.display = "block";
  //    document.getElementById("packages").style.display = "none";
  //       break;

  //   }
}
helpButton(){
  introJs().start();
}

}
function hyeps(arg0: any, hyeps: any) {
  throw new Error('Function not implemented.');
}

