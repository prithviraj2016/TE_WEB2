import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard/dashboard.service';


@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css','../../../assets/css/profile.css']
})
export class EditTeamComponent implements OnInit {
  modalService: any;
  title = 'appBootstrap';
  closeResult: string = '';
 
  location: any;
  game:any;
  submitted=false;
  imageSrc:string;
  uploadimageSrc:string;
  upload=false;
  upload1=false;
  cropImgPreview: any = '';
  newEditTeam: FormGroup =new FormGroup({});

 

  constructor(private  modalServiceS: NgbModal,
    private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,) { }

  ngOnInit(): void {
   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.newEditTeam.controls;
  }
  onFileChange(event:any):void {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this. newEditTeam.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
   
  }
  editTeam(){
    
  }
  removeImage(){
    this.cropImgPreview= '';
    this.upload1= false;
  }
  show(){
 
    this.uploadimageSrc=this.imageSrc;
    this.upload1=true;
    
  }
  open(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason: any) => {
  
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
