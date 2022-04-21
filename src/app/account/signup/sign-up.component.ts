import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router  } from '@angular/router';

import  swal  from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccountService } from '../account-service/account.service';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs';
import Validation from 'src/app/shared/helper/validation';



//import { patternValidator } from 'src/app/shared/helper/pattern-validator';
// import { whiteSpaceValidator } from 'src/app/shared/helper/white-space-validator';
// import { MustMatch } from 'src/app/shared/helper/must-match.validator';



@Component ({
    templateUrl: 'sign-up.component.html',
    styleUrls:['sign-up.component.css','../../../assets/css/custom.css', '../../../assets/css/home.css', '../../../assets/css/style.css'],
    encapsulation:  ViewEncapsulation.None

})
export class SignUpComponent implements OnInit {

    signupForm: any;
    rememberMe = false;
    submitted = false;
    massage = null;
  loading: boolean;

    constructor(
      private formbulider: FormBuilder,
        private _service: AccountService,
        private _router: Router,
        private ngxUiLoaderService: NgxUiLoaderService) { }
        ngOnInit() {
          this.signupForm=this.formbulider.group({
            'username':new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40)],
            ), 
            'cpassword': new FormControl('', [Validators.required]),
            'acceptTerms':new FormControl  (false, [Validators.requiredTrue])
            // isAgreeCheckbox:new FormControl(false, [Validators.requiredTrue]),
          },{
            validators: [Validation.match('password', 'cpassword')]
          }
          
           );
        }
        get f(): { [key: string]: AbstractControl } {
          return this.signupForm.controls;
        }
        
          createUser(){
            this.submitted = true;
            this._service.Signup(this.signupForm.value).subscribe(data =>{
              if(data){
                alert("An email has been sent for account activation.");
              }else((err: any)=>err)
              alert ("Something Went Wrong");
            })
          
          }
          }
            
             
        

      
      

        
    
      
          

  

