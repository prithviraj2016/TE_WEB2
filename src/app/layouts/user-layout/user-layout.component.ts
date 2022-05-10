import { AccountService } from './../../account/account-service/account.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls:['../../../assets/css/style.css','../../../assets/css/custom.css','../../../assets/css/dashboard.css','../../../assets/css/profile.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserLayoutComponent implements OnInit {
  userID:String="";
  loggedinUser:any;
  userName:String;
  menuVariable:boolean=false;
  closeResult: string;
  title = 'appBootstrap';
  openMenu(){
    this.menuVariable= !this.menuVariable;
  }

  constructor(
    public location: Location,
    private router: Router,
    private _service: AccountService,
    private modalService: NgbModal
    ) {}

  ngOnInit() {


  }
  searchbox(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason: any) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
  
    });
  
  }
  open1(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason: any) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
  
    });
  
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


  open2(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason: any) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
  
    });
  
  }
  private getDismissReason2(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
  
      return 'by pressing ESC';
  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
      return 'by clicking on a backdrop';
  
    } else {
  
      return  `with: ${reason}`;
  
    }
  
  }


  open(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason: any) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
  
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

  ngAfterViewInit() {

  }

  ngAfterViewChecked(){

  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
        bool = true;
    }
    return bool;
}

  // isMap(path){
  //     var titlee = this.location.prepareExternalUrl(this.location.path());
  //     titlee = titlee.slice( 1 );
  //     if(path == titlee){
  //         return false;
  //     }
  //     else {
  //         return true;
  //     }
  // }

  runOnRouteChange(): void {

  }



  // windowResizeFn(){
  //   $(document).ready(function() {
  //       function resizeElements(){
  //       var elementHeight = $(window).height() - $('#nav_bar').height() - $('#footer').height() + 2;
  //       var detailElementHeight = $(window).height() - $('#nav_bar').height() - $('#footer').height() - 55;

  //       $('.restrict_to_window').height(elementHeight);
  //       $('.detailElementHeight').height(detailElementHeight);
  //       }

  //           resizeElements();

  //           $(window).resize(function() {

  //         resizeElements()
  //         if(window.innerWidth > window.innerHeight){
  //         resizeElements()
  //         }

  //       });
  //     });
  //   }

  updateProfile(userID:String) {
 ///   this.loggedinUser = localStorage.getItem('userID');
    this.router.navigate(['/profile/'+userID]);

    }
    Logout() {
     this.loggedinUser = localStorage.removeItem('loggeduser');
     this.router.navigate(['/']);
    }
    loggedin(){
       this.loggedinUser = localStorage.getItem('loggeduser');
      this.userName=JSON.parse(this.loggedinUser).username;
      this.userID=JSON.parse(this.loggedinUser).userID;
      console.log(this.userName);
      return this.loggedinUser;
    }

}
