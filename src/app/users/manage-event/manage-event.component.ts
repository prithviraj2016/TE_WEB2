import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css', '../../../assets/css/dashboard.css']
})
export class ManageEventComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  public eventList:any[]=[];
  hype:any;
  loggedinUser:any;
  userID:String="";

  constructor(private _service:DashboardService) {
    this.imageUrl=environment.imageUrl
   }

  ngOnInit(): void {
    this.getEventdetails();
  }
  getEventdetails(){
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.userID=JSON.parse(this.loggedinUser).userID;
    
    this._service.getEvent(this.userID).subscribe(res=>{
      if(res){
      this.eventList=Object.values(res);
      this.hype=JSON.parse(JSON.stringify(this.eventList))[2];
      console.log(this.hype);
      }
        
      });
    }
}
