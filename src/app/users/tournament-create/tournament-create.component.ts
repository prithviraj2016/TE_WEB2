import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css','../../../assets/css/profile.css']
})
export class TournamentCreateComponent implements OnInit {
  showMe:boolean=false;
  showMe2:boolean=false;
  showMe1:boolean=true;
  newTournamentForm: FormGroup = new FormGroup({});
  closeResult: string = '';
  title = 'appBootstrap';
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,) { }

  ngOnInit(): void {

    this.newTournamentForm=this.formBuilder.group({
      'name':new FormControl('', [Validators.required , Validators.minLength(6),Validators.maxLength(20)]),
      'game':new FormControl('', [Validators.required ,Validators.minLength(20),Validators.maxLength(100)]),
      'startDate':new FormControl('', [Validators.required]),
      'endDate':new FormControl('',[Validators.required]),
      'tournamentType':new FormControl('',[Validators.required]),
      'imageKey':new FormControl('',[Validators.required]),
      'description':new FormControl('',[Validators.required]),
      'webURL':new FormControl('',[Validators.required]),
      'mixerStreamUr':new FormControl('',[Validators.required]),
      'twitchStreamUr':new FormControl('',[Validators.required]),
      'twitterMessage':new FormControl('',[Validators.required]),
      'notificationMessage':new FormControl('',[Validators.required]),
      'location':new FormControl('',[Validators.required]),
      'preRegiste':new FormControl('',[Validators.required]),
      'considerTeam':new FormControl('',[Validators.required]),
      'allowUserScoreSubmission':new FormControl('',[Validators.required]),
      'teamBased':new FormControl('',[Validators.required]),
      'considerLocation':new FormControl('',[Validators.required]),
      'checkinTime':new FormControl('',[Validators.required]),
      'autoAdvanceTime':new FormControl('',[Validators.required]),
    });
    
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
  open1(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason: any) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
    });
  
  } 
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }
  private getDismissReason1(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
  
      return 'by pressing ESC';
  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
      return 'by clicking on a backdrop';
  
    } else {
  
      return  `with: ${reason}`;
  
    }
  
  }
}