import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AccountService} from 'src/app/account/account-service/account.service';
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { get } from 'http';
import Validation from 'src/app/shared/helper/validation';
import { DashboardService } from 'src/app/users/dashboard/dashboard.service';
import Swal from 'sweetalert2';
declare var $:any

@Component({
  selector: 'app-home',
  templateUrl: './index.component.html',
  encapsulation: ViewEncapsulation.None

})
export class IndexComponent implements OnInit {
  title= 'appBootstrap';
  closeResult: string = '';
  wrongPassword:boolean=false;
  signinForm: any;
  forgetPasswordForm: any;
  rememberMe=false;
  submitted = false;
  submittedF=false;
  errorMessage:string = '';
  signupForm:any;
  tournamentList1:any;
  [x: string]: any;
  errorShow = false;
  _errorTxt: string;
  _re_errorTxt: string;
  closeModal: string;
  public tournamentList:any=[];
  public hype:any=[];

  forgetForm:any;



  // tournamentList: any = [
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'IPL 2020' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'WC 2020' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'Tournament' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'test' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'IPL 2022' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'IPL 2020' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'IPL 2020' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'IPL 2020' },
  //   { src: 'https://tournamentedition.com/assets/images/object1.png', title: 'IPL 2020' }
  // ]


  // Trusted By

  trusted: any = [
    { logosrc: '/assets/img/GameACon_logo.png', logotitle: 'GameACon', logosource: 'http://www.gameacon.com/' },
    { logosrc: '/assets/img/CalixTechNews.png', logotitle: 'CalixTechNews', logosource: 'http://calixtechnews.com/' },
    { logosrc: '/assets/img/pag.png', logotitle: 'Play-All-Gaming', logosource: 'https://twitter.com/playallgaming' },
    { logosrc: '/assets/img/honor_Console_logo.png', logotitle: 'Honor Console', logosource: 'https://twitter.com/ForHonorConsole' },
    { logosrc: '/assets/img/dynamik_focus_logo.png', logotitle: 'Dynamik Focus', logosource: 'https://twitter.com/dynamikfocus' },
    { logosrc: '/assets/img/galaxies_of-gaming_sm.png', logotitle: 'Galaxies Of Gaming', logosource: 'http://twingalaxiesarcade.com/' }
  ]
  slideConfig2 = { 'slidesToShow': 5, 'slidesToScroll': 5, 'dots': false, 'arrows': false };
  slideConfig = { 'slidesToShow': 4, 'slidesToScroll': 4, 'dots': false, 'arrows': false };


  imagesSlider = {
    speed:300,
    slidesToShow:1,
    slidesToScroll:1,
    cssEase:'linear',
    fade:true,
    autoplay: false,
    draggable:true,
    prevArrow:'.client-feedback .prev-arrow',
    nextArrow:'.client-feedback .next-arrow',
    asNavFor:".thumbs",
  };
  thumbnailsSlider = {
    speed:300,
    slidesToShow:4,
    slidesToScroll:1,
    cssEase:'linear',
    autoplay: false,
    centerMode:true,
    draggable:false,
    focusOnSelect:true,
    asNavFor:".feedback",
    prevArrow:'.client-thumbnails .prev-arrow',
    nextArrow:'.client-thumbnails .next-arrow',
  };

  constructor(private modalService: NgbModal,
    private frmbuilder: FormBuilder,
    private router:Router ,
    private  service:AccountService,
    private _service:DashboardService,
    private http:HttpClient) { }


  ngOnInit(){
    this.getTournamentdetails();
      $(document).foundation();
      
     this.signinForm = this.frmbuilder.group({
      'UserName':new FormControl ('', [Validators.required]),
      // 'RememberMe': [false, [Validators.required]],
      'Password':new FormControl ('', [Validators.required])

    });
    this.forgetForm =this.frmbuilder.group({
      'email': new FormControl('',[Validators.required, Validators.email]),
    }
    );

    this.signupForm=this.frmbuilder.group({
      'username':new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40)],
      ),
      'cpassword': new FormControl('', [Validators.required]),

      // isAgreeCheckbox:new FormControl(false, [Validators.requiredTrue]),
    },{
      validators: [Validation.match('password', 'cpassword')]
    }

     );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signinForm.controls;}
    get fs(): { [key: string]: AbstractControl } {
      return this.signupForm.controls;
    }
    get fp(): { [key: string]: AbstractControl } {
      return this.forgetForm.controls;}




    onSigninFormSubmit() {
      console.log(this.signinForm.value);
      this.submitted = true;
      if (this.signinForm.invalid) {
        return false;
      }else{
        var loggedUser = localStorage.getItem('loggeduser');
          if(loggedUser !="" || loggedUser !=null)
          {
            localStorage.removeItem('loggeduser');
          }

        this.service.LoginUser(this.signinForm.value).subscribe(data =>{
        if(data){

          var user = JSON.stringify(data);
          localStorage.setItem("loggeduser",user);
          //this._router.navigateByUrl('/dashboard');
          this.router.navigate(['/dashboard']);
        }
        // alert ("Something Went Wrong");
      },(error:any)=>{
        console.log(error)

        if(error && typeof(error.error) !="undefined")
        {
          this.errorMessage = '';
          error.error.errorMessages.forEach((msg:any)=>{
              this.errorMessage +=msg 
            });

        }

      });
      return true;
    }
    }

    createUser(){
        console.log(this.signupForm.value);
        this.submitted = true;
        this.service.Signup(this.signupForm.value).subscribe(data =>{
          if(data){
            alert("An email has been sent for account activation.");
          }else((err: any)=>err)
          alert ("Something Went Wrong");
        })

      }
      getTournamentdetails(){
        this._service.getTournament().subscribe(res =>{
          // let tournamentList=Object.values(res);
          
           
           
         var tournamentList=Object.values(res);
         this.hype=JSON.parse(JSON.stringify(tournamentList))[2];
          // console.log(JSON.parse(res.toString())?.hypes);
          console.log(this.hype);
           
          });
              
            }













  //   let i, x, tablink;

  //   x = document.getElementsByClassName('section_login');
  //   for (i = 0; i < x.length; i++) {
  //     x[i].style.display = 'none';
  //   }

  //   tablink = document.getElementsByClassName('tablink');
  //   for (i = 0; i < tablink.length; i++) {
  //     tablink[i].className = tablink[i].className.replace(' active-tab', '');
  //   }

  //   document.getElementById('cityName').style.display = 'block';
  //   evt.currentTarget.className += ' active-tab';
  //  }



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

      if (this.forgetForm.value.email != "" || this.forgetForm.value.email != undefined) {
        this.service.ForgetPassword(this.forgetForm.value.email).subscribe(data => {
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


    resendVerification() {
      
      if (this.forgetForm.value.email != "" || this.forgetForm.value.email != undefined) {
        this.service.resendverification(this.forgetForm.value.email).subscribe(data => {
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







