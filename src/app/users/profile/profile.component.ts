import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/users/dashboard/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/css/profile.css']
})
export class ProfileComponent implements OnInit {
show:boolean =true;
userID:any;
userName:any;
userDetails:any;
image_url: any;
submitted=false;

title = 'appBootstrap';
closeResult: string = '';
userprofileupdateForm:FormGroup=new FormGroup({});
public showPassword: boolean;
public showPassword1: boolean;
public showPassword2: boolean;
imageSrc: string = '';
loggedinUser:any;
email: any;
public dataList:any=[];
public adminDetails:any=[];
location: any;
uploadimageSrc:string;
upload1=false;
message: string[] = [];
selectedFiles?: FileList;
progressInfos: any[] = [];
  file: string | Blob;


  constructor(private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private service:DashboardService) {}

  ngOnInit(): void {
    this.shwoLocations();
 
    // this.loggedinUser = localStorage.getItem('loggeduser');
    // this.loggedinUser = JSON.parse(this.loggedinUser);
    // this.userName=this.loggedinUser.username;
    // this.email=this.loggedinUser.email;
    // this.userID=this.loggedinUser.userID;

    // console.log(this.userID)
   this.service.getTournament().subscribe(data=>{
     var dataList=Object.values(data);
     this.adminDetails=JSON.parse(JSON.stringify(dataList))[0];
     console.log(this.adminDetails);
     this.userprofileupdateForm = this.formBuilder.group({
      
      'name': new FormControl(this.adminDetails.name, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      'email': new FormControl(this.adminDetails.email,[Validators.email]),
      'phoneNumber': new FormControl(this.adminDetails.phoneNumber,[Validators.required]),
      'age': new FormControl(this.adminDetails.age, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      'imageKey': new FormControl(this.adminDetails.imageKey, [Validators.required]),
      'location': new FormControl(this.adminDetails.location, [Validators.required]),
      'messagingSetting': new FormControl(this.adminDetails.messagingSetting, [Validators.required]),
      
     })
   });
    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userprofileupdateForm.controls;
  }





updateUserProfile(){
  const formData = new FormData();
    
    formData.append('email',this.userprofileupdateForm.value.email);
    formData.append('phoneNumber',this.userprofileupdateForm.value.phoneNumber);
    formData.append('age',this.userprofileupdateForm.value.age);
    formData.append('name',this.userprofileupdateForm.value.name);
    formData.append('imageKey',this.userprofileupdateForm.value.imageKey);
    formData.append('file',this.file);
    formData.append('location',this.userprofileupdateForm.value.location);
    formData.append('messagingSetting',this.userprofileupdateForm.value.messagingSetting);

  console.log(this.userprofileupdateForm.value);
  this.service.updateProfile(this.userID, this.userprofileupdateForm.value).subscribe(data =>{
   console.log(data);
   if(data){
     alert("User Updated Successfully");
   }
   else{
     alert("User not updated");
   }
 })




}
showImage(){
 
  this.uploadimageSrc=this.imageSrc;
  this.upload1=true;
  
}
shwoLocations() {
  this.service.getLocation().subscribe((data: any) => {
    if(data){
    console.log(data);
    this.location = data;
    }
    // console.log(this.countries);
  });
}


// getToken() {
//   return localStorage.getItem('access_token');
// }

  toggle() {
    this.show = !this.show;

}
onFileChange(event:any) {
  const reader = new FileReader();

  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);

    reader.onload = () => {

      this.imageSrc = reader.result as string;

      this.userprofileupdateForm.patchValue({
        fileSource: reader.result
      });

    };

  }
}


open(content:any) {

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
open1(content:any) {

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    this.closeResult = `Closed with: ${result}`;

  }, (reason) => {

    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  });

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
uploadFiles(): void {
  this.message = [];
  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
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

