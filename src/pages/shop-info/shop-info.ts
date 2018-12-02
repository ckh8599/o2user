import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServiceProvider,ShopDetailInfo } from '../../providers/http-service/http-service';

import { HomePage } from '../../pages/home/home';

import { ShopDetailMapPage } from '../../pages/shop-detail-map/shop-detail-map';

import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ShopInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-info',
  templateUrl: 'shop-info.html',
})
export class ShopInfoPage {

  store_cd: string;
  store_nm: string;
  sessionId: string;

  pool_cd: string;
  pool_service_type: string;

  shopDetailInfo: ShopDetailInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider, public callNumber: CallNumber) {
    this.store_cd = navParams.get('store_cd');
    this.store_nm = navParams.get('store_nm');
    this.sessionId = navParams.get('sessionId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopInfoPage');

    this.httpServiceProvider.getShopDetailSearch('http://110.45.199.181/api/shop/ShopDetailSearch', this.store_cd).subscribe(data => {
      this.shopDetailInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('가맹점 정보 조회 : '+JSON.stringify(this.shopDetailInfo));
    })
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  phoneCall(phoneNum){
    console.log("전화번호 호출");
    this.callNumber.callNumber(phoneNum, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  openMap(shop_nm, location_x, location_y, shop_address, shop_phone){
    if(location_x == null || location_y == null){
      alert("설정된 지도 좌표가 없습니다.");
      return;
    }else{
      this.navCtrl.setRoot(ShopDetailMapPage,{'shop_nm':shop_nm,'location_x':location_x,'location_y':location_y,'shop_address':shop_address,'shop_phone':shop_phone});
    }
    
  }
}
