import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard/dashboard.service';






@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: [ '../../../assets/css/profile.css']
})
export class TeamCreateComponent implements OnInit {
  newTeamForm: FormGroup = new FormGroup({
    teamname:new FormControl(''),
    description:new FormControl(''),
    location:new FormControl(''),
    image:new FormControl('')
  });
  closeResult: string = '';
  imageSrc:string;
  submitted=false;


 
  private title: string;
  
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, 
    private http:HttpClient,
    private modalService: NgbModal,
    private _Service:DashboardService,
    private activatedRoute:ActivatedRoute,
   

   ) { }

  ngOnInit(): void {
    this.newTeamForm=this.formBuilder.group({
      'teamname':new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
      'description':new FormControl('', [Validators.required,Validators.minLength(20),Validators.maxLength(100)]),
      'location':new FormControl('', [Validators.required , Validators.minLength(6), Validators.maxLength(20)]),
      'image':new FormControl('',[Validators.required] ),
  
    });
    

 
}
get f(): { [key: string]: AbstractControl } {
  return this.newTeamForm.controls;
}
  public myError = (controlName: string, errorName: string) =>{
    return this.newTeamForm.controls[controlName].hasError(errorName);
}
// onSubmit(): void {
//   this.submitted = true;
//   if (this.newTeamForm.invalid) {
//     return;
//   }
//   console.log(JSON.stringify(this.newTeamForm.value, null, 2));
// }
onReset(): void {
  this.submitted = false;
  this.newTeamForm.reset();
}





  createTeam(){
    console.log(this.newTeamForm.value);
    this.submitted = true;
       if (this.newTeamForm.invalid) {
     return;
    }
     console.log(JSON.stringify(this.newTeamForm.value, null, 2));
  }
  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.newTeamForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
  upload(){
    
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

  


