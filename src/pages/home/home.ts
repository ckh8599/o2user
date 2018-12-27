import { Component } from '@angular/core';
import { NavController, ModalController, PopoverController, NavParams } from 'ionic-angular';

import { FabPage } from '../../pages/fab/fab';
import { BarcodePage } from '../../pages/barcode/barcode';
import { InformationPage } from '../../pages/information/information';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sessionId: string;

  btn_tab: string;

  brandInfo: any;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController, 
              public popoverCtrl: PopoverController,
              public DbManager: DbManagerProvider,
              public dialogs: Dialogs,
              public httpServiceProvider: HttpServiceProvider) {
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.btn_tab = navParams.get('btn_tab_number') == null?'01':navParams.get('btn_tab_number');
      this.brandInfo = navParams.get('brandInfo');
      console.log(this.btn_tab);
      //브랜드 정보조회
      this.httpServiceProvider.getBrandInfo().subscribe(data => {
        this.brandInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('홈페이지 진입 브랜드 정보 조회 : '+JSON.stringify(this.brandInfo));
      });

      this.changeFab(this.btn_tab);
    });
  }
  

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    this.btn_tab = this.navParams.get('btn_tab_number') || '01';
  }

  openInformation() { this.navCtrl.push(InformationPage); }

  openFab(btn_tab_number) {

    if(btn_tab_number != '00' ){
      this.btn_tab = btn_tab_number;
    }
    // this.dialogs.alert(this.btn_tab);
    console.log("보내기 직전 : "+this.brandInfo);
    this.navCtrl.push(FabPage, {'btn_tab_number':this.btn_tab, 'brandInfo':this.brandInfo});
  }

  changeFab(btn_tab_number){
    this.btn_tab = btn_tab_number;
  }

  openBarCode(){
    let modal = this.modalCtrl.create(BarcodePage, {}, {cssClass: "transactionConfirm-modal"});
    modal.present();    
  }
}