import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/users/dashboard/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/css/profile.css']
})
export class ProfileComponent implements OnInit {
show:boolean = false;
userID:any;
userName:any;
userDetails:any;
image_url: any;

title = 'appBootstrap';
closeResult: string = '';
userprofileupdateForm:FormGroup=new FormGroup({});
public showPassword: boolean;
public showPassword1: boolean;
public showPassword2: boolean;
imageSrc: string = '';
loggedinUser:any;
email: any;
  


  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
   
    this.loggedinUser = localStorage.getItem('loggeduser');
    this.loggedinUser = JSON.parse(this.loggedinUser);
    this.userName=this.loggedinUser.username;
    this.email=this.loggedinUser.email;
    this.userID=this.loggedinUser.userID;

    console.log(this.userID)
    // this._Service.userProfile(this.userID).subscribe( data=>{

    // });

  //   this.userprofileupdateForm=this.formBuilder.group({

  //     // 'id':new FormControl(""),
  //     // 'username': new FormControl(this.userDetails.username),
  //     'name': new FormControl(this.userDetails.name),
  //     'email': new FormControl(this.userDetails.email),
  //     'phoneNumber':new FormControl(this.userDetails.phonenumber),
  //     'location':new FormControl(this.userDetails.location),
  //     'age':new FormControl(this.userDetails.age),
  //     'imagimageUrleUrl':new FormControl(this.userDetails.imageUrl),
  //     'messagingSetting':new FormControl(this.userDetails.messagingSetting),
  //  });


//    this.userprofileupdateForm=this.formBuilder.group({

//     // 'id':new FormControl(""),
//     // 'username': new FormControl(this.userDetails.username),
//     'name': [''],
//     'email': [''],
//     'phoneNumber':[''],
//     'location':[''],
//     'age':[''],
//     'imagimageUrleUrl':[''],
//     'messagingSetting':[''],
//  });

}

updateUserProfile(){
  console.log(this.userprofileupdateForm.value);
//  this._Service.updateProfile(this.userID, this.userprofileupdateForm.value).subscribe(data =>{
//    console.log(data);
//    if(data){
//      alert("User Updated Successfully");
//    }
//    else{
//      alert("User not updated");
//    }
//  })




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

}
