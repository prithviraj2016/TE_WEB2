import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ActivatedRoute } from '@angular/router';
declare var introJs: any;

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css','../../../assets/css/profile.css']
})
export class EventCreateComponent implements OnInit {
  showMe:boolean=false;
  title = 'appBootstrap';
  closeResult: string = '';
  imageURL: string;
  imageSrc: string ;
  imageSrc1:string;
  uploadImage: FormGroup;
  submitted = false;
  uploadimageSrc: string="";
  transform: ImageTransform = {};
  imageChangedEvent: any = '';
  cropImgPreview: any = '';
  croppedImage: any = '';
  upload=false;
  upload1=false;
  newEventForm:FormGroup=new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private _router: Router,
    private http:HttpClient,
    private modalService: NgbModal,
    private _service:DashboardService) { }

  ngOnInit(): void {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("event_startDate")[0].setAttribute('min', today);
    document.getElementsByName("event_endDate")[0].setAttribute('min', today);

    this.newEventForm=this.formBuilder.group({
      'eventname':new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'description':new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(450)]),
      'customurl':new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'location':new FormControl('',[Validators.required] ),
      'sdate':new FormControl('',[Validators.required]),
      'edate':new FormControl('',[Validators.required]),
      'paidevent':new FormControl('',[Validators.required]),
      'imageKey':new FormControl('', [Validators.required])
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.newEventForm.controls;
  }

    createEvent(){
     const formData = new FormData();
     formData.append('eventname', this.newEventForm.value.eventname);
     formData.append('description', this.newEventForm.value.description);
     formData.append('customurl', this.newEventForm.value.customurl);
     formData.append('sdate', this.newEventForm.value.sdate);
     formData.append('edate', this.newEventForm.value.edate);
     formData.append('paidevent', this.newEventForm.value.paidevent);
     formData.append('imagekey', this.newEventForm.value.imageKey);


     var temp={
      "completed": false,
      "description": this.newEventForm.value.description,
      "endDate": this.newEventForm.value.edate,
      "imageKey": this.newEventForm.value.imageKey,
      "latLong": "",
      "location": "",
      "name": this.newEventForm.value.eventname,
      "paid":false,
      "startDate": this.newEventForm.value.sdate,
      "venue": this.newEventForm.value.location,
      "webURL": this.newEventForm.value.customurl,
      
     }
     
      //  console.log(this.newEventForm.value)
       this._service.createEvent(JSON.stringify(temp)).subscribe(data=>{
         if(data){
           alert("Event Created successfuly");
           this._router.navigate(['/events']);

         }
         else(err:any)=>{
           alert("Something went wrong");
         }
       });
    }
    // onReset(): void {
    //   this.submitted = false;
    //   this.newEventForm.reset();
    // }
    // showPreview(event:any) {
    //   const file = (event.target).files[0];
    //   this.uploadImage.patchValue({
    //     avatar: file
    //   });
    //   this.uploadImage.value.get('avatar').updateValueAndValidity()
    //   // File Preview
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imageURL = reader.result as string;
    //   }
    //   reader.readAsDataURL(file)
    // }
    show(){
 
      this.uploadimageSrc = this.croppedImage;
      this.upload1=true;
      
    }
    submitImage(){
      console.log("Image Upload Function");
      this._service.uploadImage(this.uploadimageSrc).subscribe((data: any) => {
        console.log(data);
        if (data) {
          alert("Image uploaded Successfully");
          //console.log(data);
      
          var _imageKey = data.response;
           
          this.newEventForm.patchValue({
            imageKey : _imageKey 
          })
  
        }
        else (err: any) => {
          
          alert("Something went wrong");
        }
      });
    }

    removeImage() {
      this.imageChangedEvent = '';
      this.cropImgPreview = '';
      this.upload1 = false;
    }

    imageCropped(event: ImageCroppedEvent) {

      this.croppedImage = event.base64;
      this.uploadimageSrc = this.croppedImage;
     
    }

    toogleTag(){
      this.showMe=!this.showMe;
    }
    open1(content:any) {

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;

      }, (reason) => {

        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      });

    }
    private getDismissReason(reason: any): string {

      if (reason === ModalDismissReasons.ESC) {

        return 'by pressing ESC';

      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

        return 'by clicking on a backdrop';

      } else {

        return  `with: ${reason}`;

      }

  }
  onFileChange(event: any): void {
    this.imageSrc = event;
    this.imageChangedEvent = this.imageSrc;
    
}

  helpButton(){
    introJs().start();
  } 
  

}
