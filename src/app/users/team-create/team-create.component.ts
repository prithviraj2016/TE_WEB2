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
  [x: string]: any;
  newTeamForm: FormGroup = new FormGroup({});
  closeResult: string = '';
  imageSrc:string;
  submitted=false;
  location: any;
  uploadimageSrc:string;
  upload=false;
  upload1=false;
  id:string;
  ArrayOfSelectedFile = new Array<string>();
 
  cropImgPreview: any = '';
  
  
  
 
  private title: string;
  file: string | Blob;
  
  constructor(private formBuilder: FormBuilder, 
    private _router: Router, 
    private http:HttpClient,
    private modalService: NgbModal,
    private service:DashboardService,
    private activatedRoute:ActivatedRoute,
   

   ) { }

  ngOnInit(): void {
    this.shwoLocations();

    this.newTeamForm=this.formBuilder.group({
      'name':new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
      'description':new FormControl('', [Validators.required,Validators.minLength(20),Validators.maxLength(100)]),
      'location':new FormControl('', [Validators.required , Validators.minLength(6), Validators.maxLength(20)]),
      'imageKey':new FormControl('',[Validators.required] ),
  
    });
    

 
}
get f(): { [key: string]: AbstractControl } {
  return this.newTeamForm.controls;
}

createTeam(){
  const formData = new FormData();
  formData.append('name', this.newTeamForm.value.name);
  formData.append('description', this.newTeamForm.value.description);
  formData.append('location', this.newTeamForm.value.customurl);
  formData.append('file', this.file);
  formData.append('imageKey',this.newTeamForm.value.image);
  
     if (this.newTeamForm.invalid) {
    console.log(this.newTeamForm.value);
   this.service.createTeam(this.newTeamForm.value).subscribe(data =>{
    if(data) {
       alert("Team Created Successfully");
     }else(err: any)=>{
       alert("Something went wrong");
     }
   });
  }
}

removeImage(){
  this.cropImgPreview= '';
  this.upload1= false;
}

onReset(): void {
  this.submitted = false;
  this.newTeamForm.reset();
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
show(){
 
  this.uploadimageSrc=this.imageSrc;
  this.upload1=true;
  
}





  
  onFileChange(event:any):void {
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

  


