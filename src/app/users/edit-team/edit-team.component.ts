import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  modalService: any;
  title = 'appBootstrap';
  closeResult: string = '';
  [x: string]: any;
  imageSrc:string;
  uploadimageSrc:string;
  upload=false;
  upload1=false;
  show1=false;
  newEditTeam: FormGroup =new FormGroup({});
 

  constructor(modalService: NgbModal,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
   
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

}
