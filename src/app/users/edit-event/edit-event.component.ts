import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  modalService: any;
  closeResult: string;
  getDismissReason: any;

  constructor() { }

  ngOnInit(): void {
  }


}
