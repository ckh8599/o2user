import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { FlipModule } from 'ngx-flip';

import { BarcodePage } from '../../pages/barcode/barcode';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';

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
  title;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
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
    if(this.btn_tab == '1') { this.btn_tab_1 = 's'; this.title = '추천 매장'; }
    if(this.btn_tab == '2') { this.btn_tab_2 = 's'; this.title = '자주가는 매장'; }
    if(this.btn_tab == '3') { this.btn_tab_3 = 's'; this.title = '주변 매장'; }
    if(this.btn_tab == '4') { this.btn_tab_4 = 's'; this.title = '이벤트'; }
  }

  changeFlip(flipDiv){
    this.flipDiv = flipDiv;
  }

  openShopInfo(seq){
    console.log('sldkjslkdfj');
    this.navCtrl.push(ShopInfoPage);
  }

  openBarCode(){
    let modal = this.modalCtrl.create(BarcodePage, {"barcode":"01012344567"});
    modal.present();
  }
}