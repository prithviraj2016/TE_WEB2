import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from '../dashboard/dashboard.service';
declare var introJs: any;


@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.css','../../../assets/css/custom.css']
})
export class ManagePlayersComponent implements OnInit {
  managePlayersForm: FormGroup = new FormGroup({});
  players:any = [];
  playersList:any = [];
  playersList1:any = [];
  tournamentID:any = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: DashboardService,) { }

  ngOnInit(): void {
    
    this.managePlayersForm = this.formBuilder.group({
      'bulkPlayers': new FormControl('',[]),
    })
    this.activatedRoute.paramMap.subscribe(params=>{
      if (params.get('id') != null) {
        let id = params.get('id')
        if (!isNaN(Number(id))) {
          this.tournamentID = Number(id);
        } else {
          console.log('Not a Number');
        }
        this.getBulkPlayers(this.tournamentID);
      }
      
    });
      }
  addBulkPlayers(){
    console.log("Adding players in bulk");
    const formData = new FormData();
    var playersArr = [];
    formData.append('bulkPlayers', this.managePlayersForm.value.bulkPlayers);
    var players = this.managePlayersForm.value.bulkPlayers;
    if(players.includes(',')) {
      playersArr = players.split(',');
    } else if(players.includes('\n')) {
      playersArr = players.split('\n');
    }
    console.log(playersArr);
    console.log();

    var bulkPlayersDataTemp = {
      "tournament":
      {"tournamentID":this.tournamentID},
      "users":playersArr
    }
    var bulkPlayersData = JSON.stringify(bulkPlayersDataTemp)
    this.service.addBulkPlayers(bulkPlayersData).subscribe((res:any)=>{
      if(res){
        this.players = res.players;
        
        console.log(this.players);
      }
    });
  }
getBulkPlayers(tournamentID:any){
  this.service.getBulkPlayers(tournamentID).subscribe((res:any)=>{
    if(res){
      this.playersList1 = res;
     this.playersList = res.players;
     for (let i = 0; i <  this.playersList.length; i++) {
      console.log(this.playersList[i].player)
      
    }console.log(this.playersList1.name)
    }
     
    });
}

helpButton(){
  introJs().start();
}
}


    
  

  
