import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
 public eventList:any[]=[];
 public eventList1:any[]=[];
 public eventList2:any[]=[];
 selectedEvent:any;
 selectedEventID:any;
 public search1:any=[];
 hype1:any;
 userID:String="";
 userName:String="";
loggedinUser:any;
files:any;
public show:boolean =false;
public searchList : any[];

  

constructor(private _service:DashboardService) {
  this.imageUrl=environment.imageUrl
}

  ngOnInit(): void {
   this.getEvent();
  }

  getEvent(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    this.userName=JSON.parse(this.loggedinUser).username;
    this._service.getEvent(this.userID).subscribe((res:any)=>{
      if(res){
      this.eventList=res.list;
      
      console.log(this.eventList);
      }
        
      });
    }

    onSelect(item:any){
      this.selectedEvent = item;
      this.selectedEventID = item.eventID;
      console.log(this.selectedEvent);
      this.getEventdetails(this.selectedEventID);
    }
  
getEventdetails(eventID:string)
{
  this._service.getEventID(eventID).subscribe((res:any)=>{
    if(res){
      this.selectedEvent = res;
      this.eventList1 = res.adminDetails;
      this.eventList2 = res.tournaments;
      console.log(this.selectedEvent);
      console.log(this.eventList1);
      console.log(this.eventList2);
    }
  });
}

    
   searchEvent(event:any){
     console.log(event.target.value);
     this._service.searchEvent(event.target.value).subscribe(res=>{
       var searchList = Object.values(res);
       this.search1=JSON.parse(JSON.stringify(searchList))[2];
       console.log(this.search1);
       this.show = !this.show;
     })
   }
    
  
  }



