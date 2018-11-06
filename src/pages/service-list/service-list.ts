import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ServiceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-list',
  templateUrl: 'service-list.html',
})
export class ServiceListPage {

  param: string;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.param = navParams.get('param')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceListPage');
    console.log('param == ' + this.param);
    if(this.param == 'P') this.title = "Point";
    if(this.param == 'S') this.title = "Stamp";
    if(this.param == 'C') this.title = "Cash";
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
