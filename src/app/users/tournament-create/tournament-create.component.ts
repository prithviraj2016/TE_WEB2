import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { DashboardService } from '../dashboard/dashboard.service';

export interface Form {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css','../../../assets/css/profile.css']
})
export class TournamentCreateComponent implements OnInit {
  showMe: boolean = false;
  showMe2: boolean = false;
  showMe1: boolean = true;
  newTournamentForm: FormGroup = new FormGroup({});
  closeResult: string = '';
  title = 'appBootstrap';
  location: any;
  game: any;
  submitted = false;
  imageSrc: string;
  uploadimageSrc: string="";
  //upload = false;
  upload1 = false;
  cropImgPreview: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  transform: ImageTransform = {};
  scale: number = 1;
  //value: number = 0;
  //public scaleFactor: number = 1;
  //public lastNumber: number = 1;
  showCropper: any = false;
  isShow = false;
  selectedValue:any;
  req: any;
  img: any;
  res: any;
  Form: any;
  Game:any;
  
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,) { }

  ngOnInit(): void {
  
 


  this.newTournamentForm = this.formBuilder.group({
    'name': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    'game': new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
    'startDate': new FormControl('', [Validators.required]),
    'endDate': new FormControl('', [Validators.required]),
    'tournamentType': new FormControl('', [Validators.required]),
    'rankBy': new FormControl('',[]),
    'swissmatchwin':new FormControl('',[]),
    'swissmatchtie':new FormControl('',[]),
    'swissgamesetwin':new FormControl('',[]),
    'swissgamesettie':new FormControl('',[]),
    'swissmatchbye':new FormControl('',[]),
    'imageKey': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'webURL': new FormControl('', [Validators.required]),
    'mixerStreamUr': new FormControl('', [Validators.required]),
    'twitchStreamUr': new FormControl('', [Validators.required]),
    'twitterMessage': new FormControl('', [Validators.required]),
    'notificationMessage': new FormControl('', [Validators.required]),
    'venue': new FormControl('', [Validators.required]),
    'preRegiste': new FormControl('', [Validators.required]),
    'considerTeam': new FormControl('', [Validators.required]),
    'allowUserScoreSubmission': new FormControl('', [Validators.required]),
    'teamBased': new FormControl('', [Validators.required]),
    'considerLocation': new FormControl('', [Validators.required]),
    'checkinTime': new FormControl('', [Validators.required]),
    'autoAdvanceTime': new FormControl('', [Validators.required]),
      
    });
    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.newTournamentForm.controls;
  }
  createTournaments() {
    const formData = new FormData();
    formData.append('name', this.newTournamentForm.value.name);
    formData.append('game', this.newTournamentForm.value.game);
    formData.append('startDate', this.newTournamentForm.value.startDate);
    formData.append('endDate', this.newTournamentForm.value.endDate);
    formData.append('tournamentType', this.newTournamentForm.value.tournamentType);
    formData.append('rankBy', this.newTournamentForm.value.rankBy);
    formData.append('swissmatchwin', this.newTournamentForm.value.swissmatchwin);
    formData.append('swissmatchtie', this.newTournamentForm.value.swissmatchtie);
    formData.append('swissgamesetwin', this.newTournamentForm.value.swissgamesetwin);
    formData.append('swissgamesettie', this.newTournamentForm.value.swissgamesettie);
    formData.append('swissmatchbye', this.newTournamentForm.value.swissmatchbye);
    formData.append('imageKey', this.newTournamentForm.value.imageKey);
    formData.append('description', this.newTournamentForm.value.description);
    formData.append('webURL', this.newTournamentForm.value.webURL);
    formData.append('mixerStreamUr', this.newTournamentForm.value.mixerStreamUr);
    formData.append('twitchStreamUr', this.newTournamentForm.value.twitchStreamUr);
    formData.append('twitterMessage', this.newTournamentForm.value.twitterMessage);
    formData.append('notificationMessage', this.newTournamentForm.value.notificationMessage);
    formData.append('venue', this.newTournamentForm.value.venue);
    formData.append('preRegiste', this.newTournamentForm.value.preRegiste);
    formData.append('considerTeam', this.newTournamentForm.value.considerTeam);
    formData.append('allowUserScoreSubmission', this.newTournamentForm.value.allowUserScoreSubmission);
    formData.append('teamBased', this.newTournamentForm.value.teamBased);
    formData.append('considerLocation', this.newTournamentForm.value.considerLocation);
    formData.append('checkinTime', this.newTournamentForm.value.location);
    formData.append('autoAdvanceTime', this.newTournamentForm.value.autoAdvanceTime);
      
    if (this.newTournamentForm.invalid) {
     
    
      console.log(this.newTournamentForm.value);
      this.service.createTournament(JSON.stringify(this.newTournamentForm.value)).subscribe((res:any) => {
        
        if (res) {
          
          //for(var i=0;i< this.newTournamentForm.value; i++)
          this.Form = res;
         //res = this.newTournamentForm 
         //this.newTournamentForm;
          console.log("Added data successfully"  , this.Form);
          alert("Team Created Successfully");
        } else (err: any) => {
          alert("Something went wrong");
        }
      });
    
    }
  }

  shwoLocations(event:any) {
    const req = this.newTournamentForm.value.location
    this.service.getLocation(event.target.value).subscribe((data: any) => {
      if (data) {
        console.log(data);
        // var _location = data.response;
        
        // this.newTournamentForm.patchValue({
        //   game : _location 
        // })
       this.location = data.list;
      } 
      else (err: any) => {
        alert("Something went wrong");
      }
      // console.log(this.countries);
    });
  }

  showGame(event:any) {
    console.log(event.target.value);
    const request = this.newTournamentForm.value.game;
    this.service.getGame(event.target.value).subscribe((res:any)=>{
      if(res){
        console.log(res);
      this.Game = res.list;
      }
      
    });
    // this.service.getGame().subscribe((data: any) => {
    //   if (data) {
       
    //     console.log(data);
    //     // var _game = data.response;

    //     // this.newTournamentForm.patchValue({
    //     //   game : _game 
    //     // })
    //     this.game = data;
    //   } else (err: any) => {
    //     alert("Something went wrong");
    //   }

    // });
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

  selectStatus(event:any) {
    
    this.selectedValue = event.target.value;
      //this.newTournamentForm.value.tournamentType == this.selectedValue;
  }
  
  onFileChange(event: any): void {
    this.imageSrc = event;
    this.imageChangedEvent = this.imageSrc;
    
}
imageCropped(event: ImageCroppedEvent) {

  this.croppedImage = event.base64;
  this.uploadimageSrc = this.croppedImage;
 
}

removeImage() {
  this.imageChangedEvent = '';
  this.cropImgPreview = '';
  this.upload1 = false;
}

show() {

  this.uploadimageSrc = this.croppedImage;
   this.upload1 = true;   
 }
  upload(){

    this.service.uploadImage(this.uploadimageSrc).subscribe((data: any) => {
     
      if (data) {
        alert("Image uploaded Successfully");
        //console.log(data);
    
        var _imageKey = data.response;
         
        this.newTournamentForm.patchValue({
          imageKey : _imageKey 
        })

      }
      else (err: any) => {
        alert("Something went wrong");
      }
    });
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