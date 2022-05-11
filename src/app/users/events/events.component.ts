import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 public eventList:any[]=[];
 public eventList1:any[]=[];
 hype:any;
 hype1:any;
 userID:String="";
 userName:String="";
loggedinUser:any;
files:any;
  

constructor(private _service:DashboardService) { }

  ngOnInit(): void {
   this.getEventdetails();
   this.getLatestEventdetails();
   this.getFiles();
  }
  getEventdetails(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    this.userName=JSON.parse(this.loggedinUser).username;
    this._service.getEvent(this.userID).subscribe(res=>{
      if(res){
      this.eventList=Object.values(res);
      this.hype=JSON.parse(JSON.stringify(this.eventList))[2];
      console.log(this.hype);
      }
        
      });
    }
  
      getLatestEventdetails(){
        this.loggedinUser = localStorage.getItem('loggeduser');
        this.userID=JSON.parse(this.loggedinUser).userID;
        this.userName=JSON.parse(this.loggedinUser).username;
        this._service.getEvent(this.userID).subscribe(res=>{
          if(res){
          this.eventList1=Object.values(res);
          this.hype1=JSON.parse(JSON.stringify(this.eventList1))[2][0];
          console.log(this.hype1);
          }
            
          });
      
        }
    
    getFiles(){
      this._service.getFiles().subscribe(res=>{
        if(res){
          this.files=Object.values(res);
        }
      });
    }
    
  }




