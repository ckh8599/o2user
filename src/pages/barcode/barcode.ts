import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import{ Brightness } from '@ionic-native/brightness';
import JsBarcode  from 'jsbarcode'

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

  currentBrightness: number;;  

  barcodeValue: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public barcodeScanner: BarcodeScanner, 
              public viewCtrl: ViewController,
              private bright: Brightness) {
    this.barcodeValue = navParams.get("barcode");    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BacodescannerPage');
    this.getBrightness();    
    this.createBacCode();
    this.setBrightness(1);
  }  
  ionViewWillLeave(){
    this.setBrightness(this.currentBrightness);    
  }
  closeBarCode(){    
    this.viewCtrl.dismiss();
  }
  createBacCode(){
    //바코드 생성
    try {
      JsBarcode("#js_barcode", this.barcodeValue);
    }catch (err) {
      console.info('Error:' + err);      
    }
  }

  //화면 밝기 값 조절 (0 ~ 1)
  setBrightness(brightnessVal){
    try {      
      this.bright.setBrightness(brightnessVal);
    }catch (err) {
      console.info('Error:' + err);      
    }   
  }

  //현재 화면 밝기 값 가져오기 (0 ~ 1)
  async getBrightness(){
    try {
      this.currentBrightness = await this.bright.getBrightness();             
    }catch (err) {
      console.info('Error:' + err);      
    }      
  }
}
