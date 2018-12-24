import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServiceProvider,ShopDetailInfo } from '../../providers/http-service/http-service';

import { HomePage } from '../../pages/home/home';

import { ShopDetailMapPage } from '../../pages/shop-detail-map/shop-detail-map';

import { CallNumber } from '@ionic-native/call-number';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { ENV } from '@app/env';

import { ModalController } from 'ionic-angular';
import { StampPage } from '../../pages/stamp/stamp';

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

  imageUrl: string;

  store_cd: string;
  store_nm: string;
  sessionId: string;

  pool_cd: string;
  pool_service_type: string;

  shopDetailInfo: ShopDetailInfo;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public httpServiceProvider: HttpServiceProvider, 
              public DbManager: DbManagerProvider,
              public callNumber: CallNumber) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.store_cd = navParams.get('store_cd');
      this.store_nm = navParams.get('store_nm');
      this.httpServiceProvider.getShopDetailSearch(this.store_cd).subscribe(data => {
        this.shopDetailInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('가맹점 정보 조회 : '+JSON.stringify(this.shopDetailInfo));

        //이미지URL설정
        this.imageUrl = ENV.image;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopInfoPage');    
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
      this.navCtrl.push(ShopDetailMapPage,{'shop_nm':shop_nm,'location_x':location_x,'location_y':location_y,'shop_address':shop_address,'shop_phone':shop_phone});
    }
    
  }

  openStamp(){    
    console.info("store_cd:" + this.store_cd);
    let modal = this.modalCtrl.create(StampPage, {'store_cd':this.store_cd}, {cssClass: "transactionConfirm-modal"});
    modal.present();        
  }
}
