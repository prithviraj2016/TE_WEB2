import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  modalService: any;
  title = 'appBootstrap';
  closeResult: string = '';

  constructor(modalService: NgbModal) { }

  ngOnInit(): void {
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
