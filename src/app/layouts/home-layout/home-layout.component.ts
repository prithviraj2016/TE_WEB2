import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'home-admin-layout',
  templateUrl: './home-layout.component.html',
  styleUrls:[ '../../../assets/css/style.css', '../../../assets/css/home.css'],
  encapsulation: ViewEncapsulation.None

})
export class HomeLayoutComponent implements OnInit {


  constructor( public location: Location, private router: Router) {}

  ngOnInit() {
    //$(document).foundation();

  }

  @HostListener("window:scroll", ["$event"])
  // onWindowScroll(e) {
  //   if (window.pageYOffset > 100) {
  //     let element = document.getElementById("nav_bar");
  //     element.classList.add("navbar-shrink");

  //   } else {
  //     let element = document.getElementById("nav_bar");
  //     element.classList.remove("navbar-shrink");

  //   }
  // }

  ngAfterViewInit() {

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

  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}
