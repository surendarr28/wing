import {Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app',
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.addEventListener("scroll", function () {
      if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        $("#dpd-header").removeClass("on-scroll-top");
        $("#dpd-header").addClass("on-scroll-bottom");
      } else {
        $("#dpd-header").addClass("on-scroll-top");
        $("#dpd-header").removeClass("on-scroll-bottom");
      }
    });
  }
}
