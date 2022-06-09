import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
declare var introJs: any;

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css', '../../../assets/css/profile.css']
})
export class EditTournamentComponent implements OnInit {
  editTournamentForm !: FormGroup;
  submitted = false;

  [x: string]: any;
  upload1 = false;
  closeResult: string = '';
  cropImgPreview: any = '';
  imgChangeEvt: any = '';
  imageSrc: string;
  message: string[] = [];
  selectedFiles?: FileList;
  uploadimageSrc: string;
  progressInfos: any[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  public tournamentDetails: any = [];
  private title: string;
  imageurls = [];
  newEditTournamentForm: FormGroup = new FormGroup({});
  showMe: boolean = false;
  showMe2: boolean = false;
  showMe1: boolean = true;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _router: Router,
    private service: DashboardService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let tournamentID = 0;
      if (params.get('id') != null) {
        let id = params.get('id')
        if (!isNaN(Number(id))) {
          tournamentID = Number(id);
        } else {
          console.log('Not a Number');
        }
      }
      this.service.getTournamentID(tournamentID).subscribe(data => {
        var dataList = data;
        this.tournamentDetails = dataList;
        let t = this.tournamentDetails.startDate;
        let t2 = this.tournamentDetails.endDate;
        var tempstart = t.split('T')[0];
        var tempend = t2.split('T')[0];
        
        console.log(this.tournamentDetails);

        this.editTournamentForm = this.formBuilder.group({
          'name': new FormControl(this.tournamentDetails.name, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
          'game_name': new FormControl(this.tournamentDetails.game.category, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
          'startDate': new FormControl(tempstart, [Validators.required]),
          'endDate': new FormControl(tempend, [Validators.required]),
          'tournamentType': new FormControl(this.tournamentDetails.tournamentType.tournamentTypeName, [Validators.required]),
          'imageKey': new FormControl(this.tournamentDetails.imageKey, [Validators.required]),
          'description': new FormControl(this.tournamentDetails.description, [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
          'custom_webUrl': new FormControl(this.tournamentDetails.webURL, [Validators.required]),
          'mixer_webUrl': new FormControl(this.tournamentDetails.mixerStreamUrl, [Validators.required]),
          'twitch_webUrl': new FormControl(this.tournamentDetails.twitchStreamUrl, [Validators.required]),
          'twitterMessage': new FormControl(this.tournamentDetails.twitterMessage, [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
          'message': new FormControl(this.tournamentDetails.notificationMessage, [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
          'location': new FormControl(this.tournamentDetails.venue, [Validators.required]),
          'checkinTime': new FormControl(this.tournamentDetails.checkinTime)
        })
      })
      
    });
  }
  editTournament() {
    if (this.editTournamentForm.invalid) {
      console.log(this.editTournamentForm.value);

    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.editTournamentForm.controls;
  }
  toogleTag() {
    this.showMe = !this.showMe;

  }
  toogleTag1() {
    this.showMe1 = !this.showMe1;

  }
  toogleTag2() {
    this.showMe2 = !this.showMe2;

  }
  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }

  show() {

    this.uploadimageSrc = this.imageSrc;
    this.upload1 = true;

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
  removeImage() {
    this.cropImgPreview = '';
    this.upload1 = false;
  }
  open1(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

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

      return `with: ${reason}`;

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
        }
      });
    }
  }
  helpButton(){
    introJs().start();
  }

}
