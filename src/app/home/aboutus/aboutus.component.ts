import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './aboutus.component.html'
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      $("#dataMedia").click(function(e) {
        e.preventDefault();
        var $this = $(this);
        var videoUrl = $this.attr("data-media");

        //var getdmid = $this.attr("getid");
        $("#subscribeform").append("<div class=popup id=videocontainer style='display:block'><a href='javascript:;' id='closePopup' class='close far fa-times-circle'></a><iframe src=" + videoUrl + "  width=100% height=100%></iframe></div>");
    });
    $("#subscribeform").on('click', 'a.close', function(){
      $('#videocontainer').remove();
     // $("#videocontainer > iframe").attr('src', $('iframe').attr('src'));
    });


    }

}
