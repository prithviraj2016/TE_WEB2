import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/common/services/dynamic-script-load-service';
// import { DynamicScriptLoaderService } from 'src/app/common/services/dynamic-script-load-service';

@Component({
  selector: 'app-home',
  templateUrl: './faq.component.html',
  styleUrls:['../../../assets/css/faq.style.css']
})
export class FaqComponent implements OnInit {

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService
    ) { }

  ngOnInit() {
     this.loadScripts();
 console.log('sacin');
    }

    private loadScripts() {


      // You can load multiple scripts by just providing the key as argument into load method of the service
      this.dynamicScriptLoader.load('faq').then(data => {
          // Script Loaded Successfully
      }).catch(error => console.log(error));
  }


}
