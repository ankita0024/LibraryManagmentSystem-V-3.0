import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import { NavController,MenuController,Nav,Platform } from 'ionic-angular';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
 next(slide, index) {
    slide.slider.slideTo(index)
  
  }

}