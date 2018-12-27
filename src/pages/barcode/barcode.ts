import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpServiceProvider, BarcodeInfo } from '../../providers/http-service/http-service';
import { DeviceManagerProvider } from '../../providers/device-manager/device_manager';
import JsBarcode  from 'jsbarcode';

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

  currentBrightness: number;  

  barcodeInfo: BarcodeInfo;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public barcodeScanner: BarcodeScanner, 
              public viewCtrl: ViewController,              
              private httpServiceProvider: HttpServiceProvider,
              private deviceManagerProvider: DeviceManagerProvider
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BacodescannerPage');

    this.httpServiceProvider.getBarcodeInfo().subscribe(data => {
      this.barcodeInfo = data;       
      this.createBarcode();          
    });
        
    this.deviceManagerProvider.getBrightness().then(val => {
      this.currentBrightness = val;
    });    
    
    this.deviceManagerProvider.setBrightness(1);    
  }  
  ionViewWillLeave(){
    this.deviceManagerProvider.setBrightness(this.currentBrightness);    
  }
  closeBarCode(){    
    this.viewCtrl.dismiss();
  }   
  createBarcode(){
    //바코드 생성
    try {        
      JsBarcode("#js_barcode", this.barcodeInfo.BARCODE, {
        height: 120,
        font: "Noto Sans",
        fontOptions: "400",
        textMargin : 5,
        margin: 5
      });
    }catch (err) {
      console.info('Error:' + err);      
    }    
  }
}
