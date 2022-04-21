import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-foundation/modal';
import { BsModalRef } from 'ngx-foundation/modal/bs-modal-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './tournaments.component.html'
})
export class TournamentsComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {









    }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {class: 'hype', ignoreBackdropClick: true,
      });
    }

    hypeNow(){

    }

// hype tabs js

showtab()
{
  // console.log(evt);

  // evt.classList.add("active");

	// var tab=tabs;
	// switch(tab) //this switch case replaces the tabContent
  //   {
  //     case "packages":
  //       document.getElementById("packages").style.display = "block";
  //       document.getElementById("national-packages").style.display = "none";
  //       break;
  //     case "national-packages":
  //    document.getElementById("national-packages").style.display = "block";
  //    document.getElementById("packages").style.display = "none";
  //       break;

  //   }
}

}
