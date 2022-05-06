import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  location: any;
  game:any;
  submitted=false;
  imageSrc:string;
  uploadimageSrc:string;
  upload=false;
  upload1=false;
  cropImgPreview: any = '';
  
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,) { }

  ngOnInit(): void {
  this.showGame();
  this.shwoLocations(); 


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
  get f(): { [key: string]: AbstractControl } {
    return this.newTournamentForm.controls;
  }
  createTournaments(){
    const formData = new FormData();
    formData.append('name', this.newTournamentForm.value.name);
    formData.append('game', this.newTournamentForm.value.game);
    formData.append('startDate', this.newTournamentForm.value.startDate);
    formData.append('endDate', this.newTournamentForm.value.endDate);
    formData.append('tournamentType', this.newTournamentForm.value.tournamentType);
    formData.append('imageKey', this.newTournamentForm.value.imageKey);
    formData.append('description', this.newTournamentForm.value.description);
    formData.append('webURL', this.newTournamentForm.value.webURL);
    formData.append('mixerStreamUr', this.newTournamentForm.value.mixerStreamUr);
    formData.append('twitchStreamUr', this.newTournamentForm.value.twitchStreamUr);
    formData.append('twitterMessage', this.newTournamentForm.value.twitterMessage);
    formData.append('notificationMessage', this.newTournamentForm.value.notificationMessage);
    formData.append('location', this.newTournamentForm.value.location);
    formData.append('preRegiste', this.newTournamentForm.value.preRegiste);
    formData.append('considerTeam', this.newTournamentForm.value.considerTeam);
    formData.append('allowUserScoreSubmission', this.newTournamentForm.value.allowUserScoreSubmission);
    formData.append('teamBased', this.newTournamentForm.value.teamBased);
    formData.append('considerLocation', this.newTournamentForm.value.considerLocation);
    formData.append('checkinTime', this.newTournamentForm.value.location);
    formData.append('autoAdvanceTime', this.newTournamentForm.value.autoAdvanceTime);
    if (this.newTournamentForm.invalid) {
      console.log(this.newTournamentForm.value);
     this.service.createTournament(JSON.stringify(this.newTournamentForm.value)).subscribe(data =>{
      if(data) {
         alert("Team Created Successfully");
       }else(err: any)=>{
         alert("Something went wrong");
       }
     });
    }
  }

  shwoLocations() {
    this.service.getLocation().subscribe((data: any) => {
      if(data){
      console.log(data);
      this.location = data;
      }else(err: any)=>{
        alert("Something went wrong");
      }
      // console.log(this.countries);
    });
  }

  showGame(){
    this.service.getGame().subscribe((data:any)=>{
      if(data){
        console.log(data);
        this.game = data;
        }else(err: any)=>{
          alert("Something went wrong");
        }

        
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
  
  onFileChange(event:any):void {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.newTournamentForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
   
  }
  removeImage(){
    this.cropImgPreview= '';
    this.upload1= false;
  }
  show(){
 
    this.uploadimageSrc=this.imageSrc;
    this.upload1=true;
    
  }
 
  
  open1(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason) => {
  
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