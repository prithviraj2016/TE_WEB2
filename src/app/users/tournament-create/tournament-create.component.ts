import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css','../../../assets/css/profile.css']
})
export class TournamentCreateComponent implements OnInit {
  showMe:boolean=false;
  showMe2:boolean=false;
  showMe1:boolean=true;
  modalService: any;
  closeResult: string;
  constructor() { }

  ngOnInit(): void {
  }
  toogleTag(){
    this.showMe=!this.showMe;
    
  }
  toogleTag1(){
    this.showMe1=!this.showMe1;
    
  }
  toogleTag2(){
    this.showMe2=!this.showMe2;
    
  }
  open1(content:any) {

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
