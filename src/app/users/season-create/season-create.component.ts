import { DashboardService } from 'src/app/users/dashboard/dashboard.service';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
declare var introJs: any;


export interface Form {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-season-create',
  templateUrl: './season-create.component.html',
  styleUrls: ['./season-create.component.css', '../../../assets/css/profile.css']
})


export class SeasonCreateComponent implements OnInit {
  [x: string]: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  uploadimageSrc:string;
  upload1=false;
  newSeasonsForm: FormGroup = new FormGroup({});
  closeResult: string = '';
  imageSrc:string;
  submitted=false;
  private title: string;
  imageurls =[];
  // this on
  // uploadimageSrc:string;
  // upload:false;
  req: any;
  img: any;
  res: any;
  Form: any;
  isShow = false;
  selectedValue:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropImgPreview: any = '';
  transform: ImageTransform = {};
  scale: number = 1;

  
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
var today = new Date().toISOString().split('T')[0];
document.getElementsByName("season_startDate")[0].setAttribute('min', today);
document.getElementsByName("season_endDate")[0].setAttribute('min', today);

  this.newSeasonsForm=this.formBuilder.group({
    'name':new FormControl('', [Validators.required , Validators.minLength(6),Validators.maxLength(20)]),
    'description':new FormControl('', [Validators.required ,Validators.minLength(20),Validators.maxLength(100)]),
    'webURL':new FormControl('', [Validators.required]),
    'startDate':new FormControl('',[Validators.required]),
    'endDate':new FormControl('',[Validators.required]),
    'imageKey':new FormControl('',[Validators.required])
  });
  
  
}
get f(): { [key: string]: AbstractControl } {
  return this.newSeasonsForm.controls;
}


  createSeasons(){
    this.submitted=true;
  if(this.newSeasonsForm.value.name=="" || this.newSeasonsForm.value.name==undefined){
    alert("Please enter season name. ");
    return; 
   };
   if(this.newSeasonsForm.value.description=="" || this.newSeasonsForm.value.description== undefined){
    alert("Please enter description. ");
    return; 
   };
   if(this.newSeasonsForm.value.webURL=="" || this.newSeasonsForm.value.webURL== undefined){
    alert("Please enter customurl");
    return; 
   };
   if(this.newSeasonsForm.value.startDate=="" || this.newSeasonsForm.value.startDate== undefined){
    alert("Please enter start date.");
    return; 
   };
   if(this.newSeasonsForm.value.endDate=="" || this.newSeasonsForm.value.endDate== undefined){
    alert("Please enter end date.");
    return; 
   };
   if(this.newSeasonsForm.value.imageKey=="" || this.newSeasonsForm.value.imageKey== undefined){
    alert("Please upload image. ");
    return; 
   }
    const formData = new FormData();
    formData.append('name', this.newSeasonsForm.value.name);
    formData.append('description', this.newSeasonsForm.value.description);
    formData.append('webURL', this.newSeasonsForm.value.webURL);
    formData.append('startDate', this.newSeasonsForm.value.startDate);
    formData.append('endDate', this.newSeasonsForm.value.endDate);
    formData.append('imageKey',this.newSeasonsForm.value.imageKey);
    console.log(this.newSeasonsForm.value);

    var temp ={
      "description":this.newSeasonsForm.value.description,
      "endDate": this.newSeasonsForm.value.endDate,
      "imageKey": this.newSeasonsForm.value.imageKey,
      "latLong": "",
      "name": this.newSeasonsForm.value.name,
      "startDate": this.newSeasonsForm.value.startDate,
      "webURL": this.newSeasonsForm.value.webURL,
    }
      
      console.log(temp);

     this.service.createSeason(JSON.stringify(temp)).subscribe((data:any) =>{

      if(data) {
        // this.Form =  data;
        // console.log("Season Created Successfully", this.Form)

         alert("Season Created Successfully");
         this._router.navigate(['/seasons']);
       }else(err: any)=>{
         alert("Something went wrong");
       }
     });
    
  }
 

  // onReset(): void {
  //   this.submitted = false;
  //   this.newSeasonsForm.reset();
    
    
  // }
 


  
 

    
  // saveImage() {

  //   this.angularCropper.cropper.crop();
  //     this.service.uploadImage(this.imageCrop).subscribe((res: any) => {
  //       if (res.body) {
  //        this.imageService.getImageByID(res.body._id).subscribe((t: Image) => {
  //         this.imageURL = t.imageUrl;
  //         console.log(this.imageURL);
  //        });
  //       }
  //     }, (err: any) => {
  //       console.log(err);
  //     });
  //   }
  
  


// onFileChange(event:any) {
//   this.message = [];
//   this.progressInfos = [];
//   this.selectedFiles = event.target.files;
//   this.previews = [];
//   if (this.selectedFiles && this.selectedFiles[0]) {
//     const numberOfFiles = this.selectedFiles.length;
//     for (let i = 0; i < numberOfFiles; i++) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         console.log(e.target.result);
//         this.previews.push(e.target.result);
//       };
//       reader.readAsDataURL(this.selectedFiles[i]);
//     }
//   }
//}

// onFileChange(event:any) {
//   const reader = new FileReader();
  
//   if(event.target.files && event.target.files.length) {
//     const [file] = event.target.files;
//     reader.readAsDataURL(file);
  
//     reader.onload = () => {

//       this.imageSrc = reader.result as string;
   
//       this.newSeasonsForm.patchValue({
//         fileSource: reader.result
//       });
 
//     }
//   }
// }

selectStatus(event:any) {
    
  this.selectedValue = event.target.value;
   
}

onFileChange(event: any): void {
  this.imageSrc = event;
  this.imageChangedEvent = this.imageSrc;
}
// cropImg(e: ImageCroppedEvent) {
//   this.cropImgPreview = e.base64;
// }

imageCropped(event: ImageCroppedEvent) {

  this.croppedImage = event.base64;
  this.uploadimageSrc = this.croppedImage;
 
}
removeImage() {
  this.imageChangedEvent = '';
  this.cropImgPreview = '';
  this.upload1 = false;
}

imgLoad() {
  // display cropper tool
}

initCropper() {
  // init cropper
}

imgFailed() {
  // error msg
}

show(){
 
  this.uploadimageSrc=this.croppedImage;
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
// selectImage(event: any) {
//   this.message = [];
//   if (this.selectedFiles) {
//     for (let i = 0; i < this.selectedFiles.length; i++) {
//       this.upload(i, this.selectedFiles[i]);
//     }
//   }
// }

upload(){

  this.service.uploadImage(this.uploadimageSrc).subscribe((data: any) => {
   
    if (data) {
      alert("Image uploaded Successfully");
      //console.log(data);
  
      var _imageKey = data.response;
       
      this.newSeasonsForm.patchValue({
        imageKey : _imageKey 
      })

    }
    else (err: any) => {
      alert("Something went wrong");
    }
  });
}

helpButton(){
  introJs().start();
}

  }
