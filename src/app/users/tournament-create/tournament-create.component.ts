import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {
  showMe:boolean=false;
  showMee:boolean=false;
  showMe1:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  toogleTag(){
    this.showMe=!this.showMe;
    
  }
  toogleTag1(){
    this.showMee=!this.showMee;
    
  }
  toogleTag2(){
    this.showMe1=!this.showMe1;
    
  }
}
