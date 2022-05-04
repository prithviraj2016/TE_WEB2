import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/users/dashboard/dashboard.service';
declare var introJs: any;


@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {
  //introJS = introJs(); // assigning it to variable
  public tournamentList:any=[];
  constructor(private _service:DashboardService) {

    //console.log(this.introJS)

    // const IntroJs = require('../../../../../../node_modules/intro.js/intro.js');
    // let guide = IntroJs.introJs();

   }

   ngOnInit() {
    this.getTournamentdetails();

   }
   getTournamentdetails(){
    this._service.getTournament().subscribe(res =>{
      this.tournamentList=Object.values(res);
       for (var i=2; i<this.tournamentList.length; i++);
       this.tournamentList[i]=i+2;
      console.log(this.tournamentList[i]);
      });
      
        
     
  
    }
helpbutton(){
  var intro1 = introJs();
      intro1.setOptions({
        steps: [
          {
            intro: "Hello world!"
          },
          {
            //element: document.querySelector('#step1'),
            intro: "This is a tooltip."
          },
          {
           // element: document.querySelectorAll('#step2')[0],
            intro: "Ok, wasn't that fun?",
            position: 'right'
          },
          {
            //element: '#step3',
            intro: 'More features, more fun.',
            position: 'left'
          },
          {
            ///element: '#step4',
            intro: "Another step.",
            position: 'bottom'
          },
          {
           // element: '#step5',
            intro: 'Get it, use it.'
          }
        ]
      });
      intro1.start();
    //introJs()// Start introjs tour

    }
}



