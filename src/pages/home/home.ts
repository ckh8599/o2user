import { Component } from '@angular/core';
import { NavController, ModalController, PopoverController, NavParams } from 'ionic-angular';

import { FabPage } from '../../pages/fab/fab';
import { BarcodePage } from '../../pages/barcode/barcode';
import { InformationPage } from '../../pages/information/information';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { Dialogs } from '@ionic-native/dialogs';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sessionId: string;

  btn_tab: string;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController, 
              public popoverCtrl: PopoverController,
              public DbManager: DbManagerProvider,
              public dialogs: Dialogs) {
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.btn_tab = navParams.get('btn_tab_number') == null?'01':navParams.get('btn_tab_number');
      console.log(this.btn_tab);
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
    this.navCtrl.push(FabPage, {'btn_tab_number':this.btn_tab});
  }

  changeFab(btn_tab_number){
    this.btn_tab = btn_tab_number;
  }

  openBarCode(){
    let modal = this.modalCtrl.create(BarcodePage, {}, {cssClass: "transactionConfirm-modal"});
    modal.present();    
  }
}