import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  showMe:boolean=false;
  title = 'appBootstrap';
  closeResult: string = '';
  newEventForm: FormGroup = new FormGroup({});
  imageURL: string;
  uploadImage: FormGroup;
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
      'eventname':new FormControl('', [Validators.required]),
      'description':new FormControl('', [Validators.required]),
      'customurl':new FormControl('', [Validators.required]),
      'location':new FormControl('',[Validators.required] ),
      'sdate':new FormControl('',[Validators.required]),
      'edate':new FormControl('',[Validators.required]),
      'image':new FormControl('', [Validators.required])
    });
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.newEventForm.controls[controlName].hasError(errorName);
    }

    createEvent(){
      console.log(this.newEventForm.value);
    this._service.createEvent().subscribe(data =>{
      if(data){
        alert("Event Created Successfully");
      }else((err:any)=>err)
      alert("Something Went Wrong");
    })


      // console.log(this.newEventForm.value);
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
      console.log(this.uploadImage.value)
    }

    toogleTag(){
      this.showMe=!this.showMe;
    }
    open(content:any) {

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

}
