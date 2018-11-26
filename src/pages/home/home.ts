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

  constructor(public navCtrl: NavController, public storage: Storage, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.storage.get('name').then((val) => {
      console.log('this.storage.get name == ', val);
    });
  }

  openInformation() { this.navCtrl.setRoot(InformationPage); }

  openFab(param) { 
    let modal = this.modalCtrl.create(FabPage);
    modal.present();
    //this.navCtrl.setRoot(FabPage, {'param':param})
  }

}