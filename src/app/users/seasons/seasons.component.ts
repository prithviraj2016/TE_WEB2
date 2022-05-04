import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
seasonList:any=[];
  constructor( private service:DashboardService) { }

  ngOnInit(): void {
    this.getSeason();
  }
getSeason(){
  this.service.getSeason().subscribe(res =>{
    if(res){
    this.seasonList = res;
     console.log(this.seasonList);
    }
  });
}
}
