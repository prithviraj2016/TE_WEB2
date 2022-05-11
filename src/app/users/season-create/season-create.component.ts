import { DashboardService } from 'src/app/users/dashboard/dashboard.service';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ImageCroppedEvent} from 'ngx-image-cropper';

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

  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    
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
    const formData = new FormData();
    formData.append('name', this.newSeasonsForm.value.seasonname);
    formData.append('description', this.newSeasonsForm.value.description);
    formData.append('webURL', this.newSeasonsForm.value.customurl);
    formData.append('startDate', this.newSeasonsForm.value.sdate);
    formData.append('endDate', this.newSeasonsForm.value.edate);
    formData.append('file', this['file']);
    formData.append('imageKey',this.newSeasonsForm.value.imageURL);
    
       if (this.newSeasonsForm.invalid) {
      console.log(this.newSeasonsForm.value);
     this.service.createSeason(JSON.stringify(formData)).subscribe(data =>{
      if(data) {
         alert("Season Created Successfully");
       }else(err: any)=>{
         alert("Something went wrong");
       }
     });
    }
  }
 

  onReset(): void {
    this.submitted = false;
    this.newSeasonsForm.reset();
    
    
  }
 


  
 

    
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



onFileChange(event: any): void {
  this.imgChangeEvt = event;
}
cropImg(e: ImageCroppedEvent) {
  this.cropImgPreview = e.base64;
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
// selectImage(event: any) {
//   this.message = [];
//   if (this.selectedFiles) {
//     for (let i = 0; i < this.selectedFiles.length; i++) {
//       this.upload(i, this.selectedFiles[i]);
//     }
//   }
// }
uploadFiles(): void {
  this.message = [];
  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
}
removeImage(){
  this.cropImgPreview= '';
  this.upload1= false;
}

upload(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };
  if (file) {
    this.service.uploadImage(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          // this.imageInfos = this.service.getFiles();
        }
      },
      error: (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
      }});
  }
}
  }
