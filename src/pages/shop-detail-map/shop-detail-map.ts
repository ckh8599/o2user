import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

// import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
/**
 * Generated class for the ShopDetailMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-detail-map',
  templateUrl: 'shop-detail-map.html',
})
export class ShopDetailMapPage {

  location_x: string;
  location_y: string;
  title: string;
  address: string;
  tel: string;
  url: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.location_x = navParams.get('location_x');
    this.location_y = navParams.get('location_y');
    this.address = navParams.get('shop_address');
    this.tel = navParams.get('shop_phone');
    this.title = navParams.get('shop_nm');

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://110.45.199.181/web/map/mapPage?Lat="+this.location_x+"&Lng="+this.location_y);

    // const options: InAppBrowserOptions = {
    //   zoom: 'no'
    // }

    // Opening a URL and returning an InAppBrowserObject
    // const browser = this.inAppBrowser.create(this.url, '_self', options);
    // const browser = this.inAppBrowser.create(this.url, '_blank', options);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailMapPage');

    this.title = this.navParams.get('shop_nm');
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
