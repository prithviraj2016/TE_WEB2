import { environment } from './../../../environments/environment.prod';
import { parse } from 'path';

import { Component, OnInit, TemplateRef } from '@angular/core';

import { DashboardService } from '../dashboard/dashboard.service';


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
  
  List:any=[];
  upload1=false;
  public show:boolean =false;
  public searchList : any[];
  constructor(private _service:DashboardService,
    ) {
      this.imageUrl=environment.imageUrl
    }
  
 

  ngOnInit() {
  
  this.getTournamentdetails();
  // this.getLatestTournamentdetails();
 
 
}

  

getTournamentdetails(){
  this.loggedinUser = localStorage.getItem('loggeduser');
  this.userName=JSON.parse(this.loggedinUser).username;
  this.userID=JSON.parse(this.loggedinUser).userID;
  this._service.getTournament().subscribe(res =>{
  var tournamentList=Object.values(res);
  this.hype=JSON.parse(JSON.stringify(tournamentList))[2];
  

   console.log(res);
     
    });
        
      }
  onSelect(item:any){
    this._service.getTournament();
    this.selectedTournament=item;
    console.log(item);
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

}
function hyeps(arg0: any, hyeps: any) {
  throw new Error('Function not implemented.');
}

