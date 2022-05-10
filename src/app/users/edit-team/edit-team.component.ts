
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent} from 'ngx-image-cropper';
import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css','../../../assets/css/profile.css']
})
export class EditTeamComponent implements OnInit {
  [x: string]: any;
  upload1=false;
  closeResult: string = '';
  cropImgPreview: any = '';
  imgChangeEvt: any = '';
  imageSrc:string;
  message: string[] = [];
  selectedFiles?: FileList;
  uploadimageSrc:string;
  progressInfos: any[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  submitted=false;
  private title: string;
  imageurls =[];
  newEditTeamForm: FormGroup = new FormGroup({});
  showMe:boolean=false;
  showMe2:boolean=false;
  showMe1:boolean=true;
  content=''

 

  constructor( private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
   
  }
  get f(): { [key: string]: AbstractControl } {
    return this. newEditTeamForm.controls;
  }
  show(){
 
    this.uploadimageSrc=this.imageSrc;
    this.upload1=true;
    
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }
  imgLoad() {
    // display cropper tool
  }
  initCropper() {
    // init cropper
  }
  imgFailed() {
    // error msg
  }
  removeImage(){
    this.cropImgPreview= '';
    this.upload1= false;
  }
  onFileChange(event: any): void {
    this.imgChangeEvt = event;
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
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.service.uploadImage(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.imageInfos = this.service.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }});
    }
  }
 
  
  
}
