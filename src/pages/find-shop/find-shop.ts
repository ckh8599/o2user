import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { ShopInfoPage } from '../../pages/shop-info/shop-info';
/**
 * Generated class for the FindShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-shop',
  templateUrl: 'find-shop.html',
})
export class FindShopPage {

  findShop = 'find';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindShopPage');
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openShopInfo(seq){
    this.navCtrl.push(ShopInfoPage);
    //let modal = this.modalCtrl.create(ShopInfoPage);
    //modal.present();
  }
}
