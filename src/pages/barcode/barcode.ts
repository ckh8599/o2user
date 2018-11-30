import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { NgxBarcodeModule } from 'ngx-barcode';

/**
 * Generated class for the BarcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {

  barcode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngxBarcodeModule: NgxBarcodeModule, public viewCtrl: ViewController) {
    this.barcode = navParams.get("barcode");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodePage');
  }
  closeBarCode(){
    this.viewCtrl.dismiss();
  }

}
