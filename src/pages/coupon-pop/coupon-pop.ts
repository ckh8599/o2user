import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DeviceManagerProvider } from '../../providers/device-manager/device_manager';

/**
 * Generated class for the CouponPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-pop',
  templateUrl: 'coupon-pop.html',
})
export class CouponPopPage {

  currentBrightness: number;
  
  couponType: string;
  shopNm: string;
  couponNm: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,              
              private deviceManagerProvider: DeviceManagerProvider
              ) {
                // this.couponType = '01';
                // this.shopNm = '샵네임';
                // this.couponNm = '쿠폰이름';
    this.couponType = navParams.get('couponType');
    this.shopNm = navParams.get('shopNm');
    this.couponNm = navParams.get('couponNm');
    
    // alert(this.couponType+" / "+this.shopNm+" / "+this.couponNm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BacodescannerPage');
        
    this.deviceManagerProvider.getBrightness().then(val => {
      this.currentBrightness = val;
    });    
    
    this.deviceManagerProvider.setBrightness(1);    
  }  
  ionViewWillLeave(){
    this.deviceManagerProvider.setBrightness(this.currentBrightness);    
  }
  closeCouponPop(){    
    this.viewCtrl.dismiss();
  }   

}
