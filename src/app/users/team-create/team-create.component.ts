import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard/dashboard.service';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';




@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: [ '../../../assets/css/profile.css']
})
export class TeamCreateComponent implements OnInit {
  [x: string]: any;
  showMe: boolean = false;
  newTeamForm: FormGroup = new FormGroup({});
  closeResult: string = '';
  imageSrc:string;
  submitted=false;
  location: any;
  uploadimageSrc:string;
  // upload=false;
  upload1=false;
  croppedImage: any = '';
  cropImgPreview: any = '';
  imageChangedEvent: any = '';
  showCropper: any = false;
  hideShowselect: string = "true";
  transform: ImageTransform = {};
  img: any;
  myInputVariable: string = '';
  filterTerm !: string;
  selectedValue:any;
  ArrayOfSelectedFile = new Array<string>();
  req: any;
  res: any;
  Form: any;

  
  
  
 
  private title: string;
  file: string | Blob;
  
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, 
    private http:HttpClient,
    private modalService: NgbModal,
    private service:DashboardService,
    private activatedRoute:ActivatedRoute,
   

   ) { }

  ngOnInit(): void {
   

    this.newTeamForm=this.formBuilder.group({
      'teamName':new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
      'description':new FormControl('', [Validators.required,Validators.minLength(20),Validators.maxLength(100)]),
      'location':new FormControl('', [Validators.required , Validators.minLength(6), Validators.maxLength(20)]),
      'imageKey':new FormControl('',[Validators.required] ),
      // 'teamSport':new FormControl('',[Validators.required] ),
  
    });
    

 
}
get f(): { [key: string]: AbstractControl } {
  return this.newTeamForm.controls;
}

createTeam(){
  this.submitted=true;
  if(this.newTeamForm.value.teamName=="" || this.newTeamForm.value.teamName==undefined){
    alert("Please enter team name. ");
    return; 
   };
   if(this.newTeamForm.value.description=="" || this.newTeamForm.value.description== undefined){
    alert("Please enter description. ");
    return; 
   };
   if(this.newTeamForm.value.location=="" || this.newTeamForm.value.location== undefined){
    alert("Please enter location.");
    return; 
   };
   if(this.newTeamForm.value.imageKey=="" || this.newTeamForm.value.imageKey== undefined){
    alert("Please upload image. ");
    return; 
   }
  console.log(this.newTeamForm.value.location)
  const formData = new FormData();
  formData.append('teamName', this.newTeamForm.value.teamName);
  formData.append('description', this.newTeamForm.value.description);
  formData.append('location', this.newTeamForm.value.loaction);
  // formData.append('file', this.file);
  formData.append('imageKey',this.newTeamForm.value.imageKey);
  

  var data = {
    "teamName": this.newTeamForm.value.teamName,
    "description": this.newTeamForm.value.description,
    "teamSport": true,
    "location": this.newTeamForm.value.location,
    "imageKey": this.newTeamForm.value.imageKey
  }
  console.log(data);
   this.service.createTeam(JSON.stringify(data)).subscribe({
     next:(res)=>{
       alert("Team Created Sucessfully")
       this._router.navigate(['/teams']);
     },
     error:(err)=>{
       console.log(err);
     }
   });
   
}

removeImage(){
  this.cropImgPreview= '';
  this.upload1= false;
}

toogleTag(){
  this.showMe=!this.showMe;
  
}
onReset(): void {
  this.submitted = false;
  this.newTeamForm.reset();
}
mySelectClick(value:any){
  this.hideShowselect = "false";
  // console.log("select ki value = ", value);
  //  this.newTournamentForm.value.location.setValue(value)?
  this.myInputVariable = value;
}
shwoLocations(event:any) {
 this.hideShowselect="true";
 console.log(event.target.value);
 const req = this.newTeamForm.value.location
 this.service.getLocation(event.target.value).subscribe((data: any) => {
  if (data) {
    this.location = data.list;
    console.log(this.location[0].formatted_address);
    // this.newTournamentForm.patchValue({
    //   location : data.list[0].formatted_address
    // })
  
  } 
  else (err: any) => {
    alert("Something went wrong");
  }
});
  
}
show(){
 
  this.uploadimageSrc=this.croppedImage;
  this.upload1=true;
  
}
upload(){
   this.service.uploadImage(this.uploadimageSrc).subscribe((data:any)=>{
     if(data){
       alert("Image Upload Successfully");
       var _imageKey = data.response;
       this.newTeamForm.patchValue({
        imageKey : _imageKey 
    
   })
  }
   else(err:any)=>{
     alert("Something went wrong");

   }
  });
  
}
imageCropped(event:ImageCroppedEvent){
  this.croppedImage = event.base64;
  this.uploadimageSrc = this.croppedImage;
}



  
  onFileChange(event:any):void {
  this.imageSrc = event;
  this.imageChangedEvent = this.imageSrc;
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

  


