import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {

  coupon = 'o2';
  listOrView = 'list';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  search(){
    console.log(event);
  }

  //O2쿠폰 상세보기
  viewO2Detail(seq){
    this.listOrView = 'view';
  }

  //My쿠폰 상세보기
  viewMyDetail(seq){
    this.listOrView = 'view';
  }

  //상단 탭 클릭시 상세복에서 리스트로 변경
  segmentChange(){
    this.listOrView = 'list';
  }

}
