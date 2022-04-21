import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './features.component.html',
})
export class FeaturesComponent implements OnInit {
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, "arrows": false, "fade": true, "adaptiveHeight": true, "swipeToSlide": false};
  constructor() { }

  ngOnInit() {
  
 
    }

}
