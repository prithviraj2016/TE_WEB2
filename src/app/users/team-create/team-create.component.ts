import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  newTeamForm: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, 
    private http:HttpClient) { }

  ngOnInit(): void {
    this.newTeamForm=this.formBuilder.group({
      'teamname':new FormControl('', [Validators.required]),
      'description':new FormControl('', [Validators.required]),
      'location':new FormControl('', [Validators.required]),
      'image':new FormControl('',[Validators.required] ),
    //  'teamspot':new FormControl('',[Validators.required] )
    });
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.newTeamForm.controls[controlName].hasError(errorName);
}

  createTeam(){
    console.log(this.newTeamForm.value);
  }
  }


