import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the UserManual page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-manual',
  templateUrl: 'user-manual.html'
})
export class UserManualPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
   next(slide, index) {
    slide.slider.slideTo(index)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserManualPage');
  }

}
