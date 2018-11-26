import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { FlipModule } from 'ngx-flip';

@IonicPage()
@Component({
  selector: 'page-fab',
  templateUrl: 'fab.html',
})
export class FabPage {

  btn_tab_1 = 'n';
  btn_tab_2 = 'n';
  btn_tab_3 = 'n';
  btn_tab_4 = 'n';
  btn_tab;
  flipDiv = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.changeFab(navParams.get('param'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FabPage');
  }

  closeFab(str){
    this.viewCtrl.dismiss();
  }

  changeFab(btn_tab_number){
    this.btn_tab_1 = 'n';
    this.btn_tab_2 = 'n';
    this.btn_tab_3 = 'n';
    this.btn_tab_4 = 'n';
    this.btn_tab = btn_tab_number;
    if(this.btn_tab == '1') { this.btn_tab_1 = 's'; }
    if(this.btn_tab == '2') { this.btn_tab_2 = 's'; }
    if(this.btn_tab == '3') { this.btn_tab_3 = 's'; }
    if(this.btn_tab == '4') { this.btn_tab_4 = 's'; }
  }

  changeFlip(flipDiv){
    this.flipDiv = flipDiv;
  }
}