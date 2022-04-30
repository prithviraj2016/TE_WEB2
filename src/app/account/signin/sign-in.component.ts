import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { BsModalRef } from 'ngx-foundation/modal/bs-modal-ref.service';
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
// import { BsModalService } from 'ngx-foundation/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../account-service/account.service';
import  swal  from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { BsModalService } from 'ngx-foundation/modal/bs-modal.service';



//import swal from "sweetalert2"


declare var $: any;
@Component({
    templateUrl : 'sign-in.component.html',
    styleUrls : [ '../../../assets/css/style.css', '../../../assets/css/home.css'],
    encapsulation : ViewEncapsulation.None

})
export class SignInComponent implements OnInit {
  // modalRef: BsModalRef;
  title= 'appBootstrap';
  closeResult: string = '';
  signinForm: any;
  forgetPasswordForm: any;
  rememberMe=false;
  submitted = false;
  submittedF=false;
  massage = null;
  username=null;
  password=null;
  errorShow = false;
  _errorTxt: string;
  _re_errorTxt: string;
  closeModal: string;

    constructor(private modalService: NgbModal,
        private formbulider: FormBuilder,

        private _service:AccountService,
        private _router:Router,
        private ngxUiLoaderService: NgxUiLoaderService
        ) { }
        ngOnInit() {
         // this.loadScripts();
            this.signinForm = this.formbulider.group({
                'UserName':new FormControl ('', [Validators.required]),
                // 'RememberMe': [false, [Validators.required]],
                'Password':new FormControl ('', [Validators.required])

              });
              this.forgetPasswordForm = this.formbulider.group({
                'email': new FormControl ('', [Validators.required, Validators.email]),

              });


          //let loggedUser = localStorage.getItem('loggeduser-remember');

          // if(loggedUser !='' && loggedUser !=null)
          // {
          //   const lp: any = JSON.parse(loggedUser);
          //   this.signinForm.patchValue({
          //     UserName: lp.UserName,
          //     RememberMe:lp.RememberMe,
          //     Password:lp.Password});

          // }


          // Signup/Signin Background image



            var images = ['main-banner-two.jpg', 'main-banner-first.jpg'];


            // $('<img class="fade-in" src="assets/img/' + images[Math.floor(Math.random() * images.length)] + '">').appendTo('#background-img').load(function(){
            //     $(this).remove();
            //     $('#background-img').css({'background-image': 'url(assets/img/' + images[Math.floor(Math.random() * images.length)] + ')'});
            //     $("#background-overlay").addClass("overlay-timout");
            // });


        }


        get f() { return this.signinForm.controls; }
        get fp() { return this.forgetPasswordForm.controls; }

        onSigninFormSubmit() {

          var loggedUser = localStorage.getItem('loggeduser');
          if(loggedUser !="" || loggedUser !=null)
          {
            localStorage.removeItem('loggeduser');
          }

          this._service.LoginUser(this.signinForm.value).subscribe(data =>{
            if(data){
              var user = JSON.stringify(data);
              localStorage.setItem("loggeduser",user);
              // swal.fire("login Successfully");
              //this._router.navigateByUrl('/dashboard');
              this._router.navigate(['/dashboard']);
            }else((err: any)=>err)
            // alert ("Something Went Wrong");
          })

        } 


       checkValue(){
       }

       onForgetPasswordFormSubmit(){

       }

      openModal(template: TemplateRef<any>) {
      //   this.modalRef = this.modalService.show(template, {class: 'tiny', ignoreBackdropClick: true,
      // });
      }
      open(content: any) {

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    
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
    
          return `with: ${reason}`;
    
        }
    
      }
      forgetpassword() {
    
        if (this.forgetPasswordForm.value.email != "" || this.forgetPasswordForm.value.email != undefined) {
          this._service.ForgetPassword(this.forgetPasswordForm.value.email).subscribe(data => {
            if (data) {
    
              console.log(data);
            } else {
              console.log("err");
            }
    
    
          },
            err => {
              console.log(err);
    
              if (err.status == 500) {
                if (typeof (err.error) != 'undefined' && typeof (err.error.errorMessages) != 'undefined' && err.error.errorMessages.length > 0) {
                  this._errorTxt = '';
                  this.errorShow = true;
                  err.error.errorMessages.forEach((errorTxt: string) => {
                    this._errorTxt += errorTxt + ' ';
                  });
    
                  // Swal.fire("Error",_errorTxt,"error");
    
    
                } else {
                  //Swal.fire("Error","Internal server error","error");
                }
    
              }
    
              // check error status code is 500, if so, do some action
            });
    
    
        }
      }
    
    
      resendVerification(){
   
        if (this.forgetPasswordForm.value.email != "" || this.forgetPasswordForm.value.email != undefined) {
          this._service.resendverification(this.forgetPasswordForm.value.email).subscribe(data => {
            this._re_errorTxt = "Account is already Active";
            if (data) {
              console.log(data);
            } else {
              console.log("err");
            }
    
    
          },
            err => {
              console.log(err);
            
              if (err.status) {
                if (typeof (err.error) != 'undefined' && typeof (err.error.errorMessages) != 'undefined' && err.error.errorMessages.length > 0) {
                  this._re_errorTxt = '';
    
                  this._re_errorTxt += err.error.errorMessages[0];
    
    
                  // Swal.fire("Error",_errorTxt,"error");
    
    
                } else {
                  // Swal.fire("Error","Internal server error","error");
                }
    
              }
    
              // check error status code is 500, if so, do some action
            });
    
    
        }
      }
    
      open1(content: any) {
    
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    
          this.closeResult = `Closed with: ${result}`;
    
        }, (reason: any) => {
    
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
        });
    
    
    
    
      }
      triggerModal(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
          this.closeModal = `Closed with: ${res}`;
        }, (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason2(res)}`;
        });
      }
    
      public getDismissReason2(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
      triggerModal2(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
          this.closeModal = `Closed with: ${res}`;
        }, (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason3(res)}`;
        });
      }
      private getDismissReason3(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
      triggerModal3(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
          this.closeModal = `Closed with: ${res}`;
        }, (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason3(res)}`;
        });
      }
    
    
}
    




