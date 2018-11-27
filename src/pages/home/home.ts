import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FabPage } from '../../pages/fab/fab';
import { InformationPage } from '../../pages/information/information';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  btn_tab_1 = 'n';
  btn_tab_2 = 'n';
  btn_tab_3 = 'n';
  btn_tab_4 = 'n';
  btn_tab;

  constructor(public navCtrl: NavController, public storage: Storage, public modalCtrl: ModalController) {
    this.changeFab('1');
  }

  ionViewDidLoad() {
    this.storage.get('name').then((val) => {
      console.log('this.storage.get name == ', val);
    });
  }

  openInformation() { this.navCtrl.setRoot(InformationPage); }

  openFab(param) {
    if(param == '0'){
      param = 1;
    }
    let modal = this.modalCtrl.create(FabPage, { param: param });
    modal.present();
    //this.navCtrl.setRoot(FabPage, {'param':param})
  }

  changeFab(btn_tab_number){
    this.btn_tab_1 = 'n';
    this.btn_tab_2 = 'n';
    this.btn_tab_3 = 'n';
    this.btn_tab_4 = 'n';
    this.btn_tab = btn_tab_number;
    if(this.btn_tab == '1') { this.btn_tab_1 = 's'; }
    if(this.btn_tab == '2') { this.btn_tab_2 = 's'; }
    if(this.btn_tab == '3') { this.btn_tab_3 = 's'; }
    if(this.btn_tab == '4') { this.btn_tab_4 = 's'; }
  }
}