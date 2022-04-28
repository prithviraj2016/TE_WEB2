import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { __values } from 'tslib';
import { ContactusService } from './contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  [x: string]: any;
  closeResult: string = '';

  contactForm:any;
  submitted=false;

  constructor(private frmbuilder: FormBuilder,
    private router:Router,
    private service: ContactusService,
    private http:HttpClient,
    private cd:ChangeDetectorRef,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.contactForm =this.frmbuilder.group({
      'fname':new FormControl('', [Validators.required]),
      'email': new FormControl('',[Validators.required, Validators.email]),
      'contact':new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]),
      'message':new FormControl('',[Validators.required,Validators.minLength(100)])



    })
   }

   get f(){return this.contactForm.controls;}


 async submit(){
    this.submitted=true;


    await  this.service.create(this.contactForm.value).subscribe((res)=>{

      console.log(this.contactForm.value)
    },err=>{
      console.log(err);
      if (typeof (err.error) != 'undefined' && typeof (err.error.errorMessages) != 'undefined' && err.error.errorMessages.length > 0) {
      let errmsg=  err.error.errorMessages[0];
      alert("Oops, something went wrong. Please try again later!");
      console.log(errmsg);
      }
    })
    if(this.contactForm.value.fname=="" || this.contactForm.value.fname==undefined ){
      alert("Please enter full name. ");
      return;
       }
       if( this.contactForm.value.email==="" ||  this.contactForm.value.email==undefined){
         alert("Please enter email");
         return;
       };

       if( this.contactForm.value.contact.length!= 10 ){
         alert("Please enter atleast 10 numbers in contact no..");
         return;
       };
       if( this.contactForm.value.contact.message==="" ||  this.contactForm.value.email==undefined){
         alert("Please enter atleast 100 characters in message.");
         return;
       };




  };

  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this['closeModal'] = `Closed with: ${res}`;
    }, (res) => {
      this['closeModal'] = `Dismissed ${this['getDismissReason2'](res)}`;
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

    localError() {
      throw Error("The app component has thrown an error!");
    };
    failingRequest() {
      this.http.get('https://httpstat.us/404?sleep=2000').toPromise();
    };

    successfulRequest() {
      this.http.get('https://httpstat.us/200?sleep=2000').toPromise();
    };
  }




function triggerModal(content: any, any: any) {
  throw new Error('Function not implemented.');
}

function content(content: any, any: any) {
  throw new Error('Function not implemented.');
}



function getDismissReason2(reason: any, any: any) {
  throw new Error('Function not implemented.');
}


function reason(reason: any, any: any) {
  throw new Error('Function not implemented.');
}
