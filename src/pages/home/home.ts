import { Component } from '@angular/core';
import { NavController, ModalController, PopoverController, NavParams } from 'ionic-angular';

import { FabPage } from '../../pages/fab/fab';
import { BarcodePage } from '../../pages/barcode/barcode';
import { InformationPage } from '../../pages/information/information';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sessionId: string;

  btn_tab_1 = 'n';
  btn_tab_2 = 'n';
  btn_tab_3 = 'n';
  btn_tab_4 = 'n';
  btn_tab: string;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController, 
              public popoverCtrl: PopoverController,
              public DbManager: DbManagerProvider) {
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.btn_tab = navParams.get('btn_tab_number') == null?'01':navParams.get('btn_tab_number');
      this.changeFab(this.btn_tab);
    });
  }
  

  ionViewDidLoad() {
    
  }

  openInformation() { this.navCtrl.push(InformationPage); }

  openFab(btn_tab_number) {
    if(btn_tab_number == '0'){
      btn_tab_number = this.btn_tab;
    }
    // let modal = this.modalCtrl.create(FabPage, { param: param });
    // modal.present();
    this.navCtrl.push(FabPage, {'btn_tab_number':btn_tab_number});
  }

  changeFab(btn_tab_number){
    this.btn_tab_1 = 'n';
    this.btn_tab_2 = 'n';
    this.btn_tab_3 = 'n';
    this.btn_tab_4 = 'n';
    this.btn_tab = btn_tab_number;
    if(this.btn_tab == '01') { this.btn_tab_1 = 's'; }
    if(this.btn_tab == '02') { this.btn_tab_2 = 's'; }
    if(this.btn_tab == '03') { this.btn_tab_3 = 's'; }
    if(this.btn_tab == '04') { this.btn_tab_4 = 's'; }
  }

  openBarCode(){
    let modal = this.modalCtrl.create(BarcodePage, {"barcode":"01012344567"}, {cssClass: "transactionConfirm-modal"});
    modal.present();    
  }
}