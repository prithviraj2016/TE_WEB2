import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account-service/account.service';

@Component({
  selector: 'app-season-create',
  templateUrl: './season-create.component.html',
  styleUrls: ['./season-create.component.css']
})
export class SeasonCreateComponent implements OnInit {
  [x: string]: any;
  newSeasonsForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, public _Service: AccountService, 
    private http:HttpClient) { }

  ngOnInit(): void {
  
  this.newSeasonsForm=this.formBuilder.group({
    'seasonname':new FormControl('', [Validators.required]),
    'description':new FormControl('', [Validators.required]),
    'customurl':new FormControl('', [Validators.required]),
    'sdate':new FormControl('',[Validators.required]),
    'edate':new FormControl('',[Validators.required]),
    'image':new FormControl('', [Validators.required])
  });
  
  
}
public myError = (controlName: string, errorName: string) =>{
return this.newSeasonsForm.controls[controlName].hasError(errorName);
  }

  createSeasons(){
    // console.log(this.newSeasonsForm.value);
    // this._Service.addSeason().subscribe(data=>{
    //   if(data){
    //     alert("Season is Created successfully");
    //   };
      
    // })
  }
  selectFile(event: any) {
    if (event.target.files.length > 0) {
console.log(event.target);
     this['file'] = event.target.files[0];

     
   }
}
}
