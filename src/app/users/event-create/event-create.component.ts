import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css','../../../assets/css/profile.css']
})
export class EventCreateComponent implements OnInit {
  showMe:boolean=false;
  title = 'appBootstrap';
  closeResult: string = '';
  imageURL: string;
  imageSrc: string = '';
  imageSrc1:string;
  uploadImage: FormGroup;
  submitted = false;
  newEventForm:FormGroup=new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private _router: Router,
    private http:HttpClient,
    private modalService: NgbModal,
    private _service:DashboardService) { }

  ngOnInit(): void {
    this.uploadImage = this.formBuilder.group({
      avatar: [null],
      name: ['']
    })

    this.newEventForm=this.formBuilder.group({
      'eventname':new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'description':new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(450)]),
      'customurl':new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'location':new FormControl('',[Validators.required] ),
      'sdate':new FormControl('',[Validators.required]),
      'edate':new FormControl('',[Validators.required]),
      'paidevent':new FormControl('',[Validators.required]),
      'image':new FormControl('', [Validators.required])
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.newEventForm.controls;
  }

    createEvent(){
      console.log(this.newEventForm.value);
      this.submitted = true;
         if (this.newEventForm.invalid) {
       return;
      }
       console.log(JSON.stringify(this.newEventForm.value, null, 2));
      // console.log(this.newEventForm.value);
    }
    onReset(): void {
      this.submitted = false;
      this.newEventForm.reset();
    }
    showPreview(event:any) {
      const file = (event.target).files[0];
      this.uploadImage.patchValue({
        avatar: file
      });
      this.uploadImage.value.get('avatar').updateValueAndValidity()
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
    submitImage(){
      console.log(this.uploadImage.value);
    }

    toogleTag(){
      this.showMe=!this.showMe;
    }
    open1(content:any) {

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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

        return  `with: ${reason}`;

      }

  }
  onFileChange(event:any) {
    const reader = new FileReader();
  
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
  
        this.imageSrc = reader.result as string;
  
        this.newEventForm.patchValue({
          fileSource: reader.result
        });
  
      };
  
    }
    
  }
  
  

}
