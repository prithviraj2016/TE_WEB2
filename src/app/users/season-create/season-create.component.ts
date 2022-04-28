import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account-service/account.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-season-create',
  templateUrl: './season-create.component.html',
  styleUrls: ['./season-create.component.css', '../../../assets/css/profile.css']
})
export class SeasonCreateComponent implements OnInit {
  [x: string]: any;
  newSeasonsForm: FormGroup = new FormGroup({
    
    seasonname:new FormControl(''),
    description:new FormControl(''),
    customurl:new FormControl(''),
      image:new FormControl(''),
      sdate:new FormControl(''),
      edate:new FormControl('')
   
  });
  closeResult: string = '';
  imageSrc:string;
  submitted=false;
  private title: string;
  // this on
  uploadimageSrc:string;
  upload=false;

  constructor(private formBuilder: FormBuilder, 
    private _router: Router, public _Service: AccountService, 
    private http:HttpClient
    ,
    private activatedRoute:ActivatedRoute,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
  
  this.newSeasonsForm=this.formBuilder.group({
    'seasonname':new FormControl('', [Validators.required , Validators.minLength(6),Validators.maxLength(20)]),
    'description':new FormControl('', [Validators.required ,Validators.minLength(20),Validators.maxLength(100)]),
    'customurl':new FormControl('', [Validators.required]),
    'sdate':new FormControl('',[Validators.required]),
    'edate':new FormControl('',[Validators.required]),
    'image':new FormControl('', [Validators.required])
  });
  
  
}
get f(): { [key: string]: AbstractControl } {
  return this.newSeasonsForm.controls;
}
public myError = (controlName: string, errorName: string) =>{
return this.newSeasonsForm.controls[controlName].hasError(errorName);
  }

  createSeasons(){
    console.log(this.newSeasonsForm.value);
    this.submitted = true;
       if (this.newSeasonsForm.invalid) {
     return;
    }
     console.log(JSON.stringify(this.newSeasonsForm.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.newSeasonsForm.reset();
  }
  
  selectFile(event: any) {
    if (event.target.files.length > 0) {
console.log(event.target);

     this['file'] = event.target.files[0];

     
   }
}
onFileChange(event:any) {
  const reader = new FileReader();
  
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {

      this.imageSrc = reader.result as string;
   
      this.newSeasonsForm.patchValue({
        fileSource: reader.result
      });
 
    };
 
  }
}
// this one
show(){
 
  this.uploadimageSrc=this.imageSrc;
  this.upload=true;
  
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
