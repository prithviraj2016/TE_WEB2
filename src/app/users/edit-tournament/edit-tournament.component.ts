import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {

  showMe:boolean=false;
  showMe2:boolean=false;
  showMe1:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }
  toogleTag(){
    this.showMe=!this.showMe;
    
  }
  toogleTag1(){
    this.showMe1=!this.showMe1;
    
  }
  toogleTag2(){
    this.showMe2=!this.showMe2;
    
  }

}
