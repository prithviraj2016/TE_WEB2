import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent} from 'ngx-image-cropper';
import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
declare var introJs: any;

@Component({
  selector: 'app-edit-season',
  templateUrl: './edit-season.component.html',
  styleUrls: ['./edit-season.component.css','../../../assets/css/profile.css']
})
export class EditSeasonComponent implements OnInit {
  imageUrl:string="https://s3.amazonaws.com/vgroup-tournament/";
  [x: string]: any;
  upload1=false;
  closeResult: string = '';
  cropImgPreview: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageSrc:string;
  tempImgSrc: string = 'assets/img/my-account-placeholder.png';
  message: string[] = [];
  selectedFiles?: FileList;
  uploadimageSrc:string;
  progressInfos: any[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  submitted=false;
  private title: string;
  imageurls =[];
  public seasonDetails: any = [];
  newEditSeasonForm: FormGroup = new FormGroup({});
  showMe:boolean=false;
  showMe2:boolean=false;
  showMe1:boolean=true;
  editSeasonForm !: FormGroup;
  content=''


  constructor(  private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private _router: Router, 
    private service:DashboardService, 
    private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private clipboardApi: ClipboardService) { 
      this.imageUrl=environment.imageUrl
    }

  ngOnInit(): void {
var today = new Date().toISOString().split('T')[0];
document.getElementsByName("season_startDate")[0].setAttribute('min', today);
document.getElementsByName("season_endDate")[0].setAttribute('min', today);


    this.activatedRoute.paramMap.subscribe(params =>{
      let seasonID = 0;
      if (params.get('id') != null){
        let id = params.get('id')
        if (!isNaN(Number(id))){
         seasonID = Number(id); 
        }else{
          console.log('Not a Number');
        }
      }
      this.service.getSeasonID(seasonID).subscribe(data =>{
        var dataList = data;
        this.seasonDetails = dataList;
        let t = this.seasonDetails.startDate;
        let t2 = this.seasonDetails.endDate;
        var tempstart = t.split('T')[0];
        var tempend = t2.split('T')[0];
        this.tempImgSrc = this.imageUrl + this.seasonDetails.imageKey;
        console.log(this.seasonDetails);

        this.editSeasonForm = this.formBuilder.group({
          'name': new FormControl(this.seasonDetails.name, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
          'description': new FormControl(this.seasonDetails.description, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
          'webURL': new FormControl(this.seasonDetails.webURL, [Validators.required]),
          'endDate': new FormControl(tempend, [Validators.required]),
          'startDate': new FormControl(tempstart, [Validators.required]),
          'imageKey': new FormControl(this.seasonDetails.imageKey, [Validators.required]),
        });
      });
    });
  }

  get f(): { [key: string]: AbstractControl } 
  {
    return this.editSeasonForm.controls;
  }
  editSeason() 
    {
      this.submitted = true;
      if(this.seasonDetails.name == "" || this.seasonDetails.name == undefined) {
        Swal.fire("Please enter season name.");
        return; 
      };
      const formData = new FormData();
      formData.append('name', this.editSeasonForm.value.name);
      formData.append('description', this.editSeasonForm.value.description);
      formData.append('webURL', this.editSeasonForm.value.webURL);
      formData.append('endDate', this.editSeasonForm.value.endDate);
      formData.append('startDate', this.editSeasonForm.value.startDate);
      formData.append('imageKey', this.editSeasonForm.value.imageKey);
      console.log(this.editSeasonForm.value);

      var temp = {
      "description":this.editSeasonForm.value.description,
      "endDate": this.editSeasonForm.value.endDate,
      "imageKey": this.editSeasonForm.value.imageKey,
      "latLong": "",
      "name": this.editSeasonForm.value.name,
      "startDate": this.editSeasonForm.value.startDate,
      "webURL": this.editSeasonForm.value.webURL,
      }
      console.log(temp);
      
      this.service.updateSeason(JSON.stringify(temp)).subscribe((data:any)=>{
        if(data){
          alert("Season Updated Successfully");
          this._router.navigate(['/seasons']);
        } else(err:any)=>{
          alert("Something went wrong");
        }
      });
    }
   
  
  onFileChange(event: any): void {
      this.imageSrc = event;
      this.imageChangedEvent = this.imageSrc;
    }

    imageCropped(event: ImageCroppedEvent) {

      this.croppedImage = event.base64;
      this.uploadimageSrc = this.croppedImage;
     
    }

  show(){
 
    this.uploadimageSrc=this.croppedImage;
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
  this.imageChangedEvent = '';
  this.cropImgPreview = '';
  this.upload1 = false;
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
  upload(){

    this.service.uploadImage(this.uploadimageSrc).subscribe((data: any) => {
     
      if (data) {
        alert("Image uploaded Successfully");
        //console.log(data);
    
        var _imageKey = data.response;
         
        this.editSeasonForm.patchValue({
          imageKey : _imageKey 
        })
  
      }
      else (err: any) => {
        alert("Something went wrong");
      }
    });
  }
  
 
 
  copyText() {
    this.clipboardApi.copyFromContent(this.content)
  }
  helpButton(){
    introJs().start();
  }

}
