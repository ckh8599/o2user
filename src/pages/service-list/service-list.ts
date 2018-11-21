import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

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
  providers: [HttpServiceProvider]
})
export class ServiceListPage {

  param: string;
  title: string;
  seletedMonth: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public httpServiceProvider: HttpServiceProvider) {
    this.param = navParams.get('param');
    this.seletedMonth = "1";
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

  onChange(selectedValue: string) {
    console.log('selectedValue == ' + selectedValue);
    this.seletedMonth = selectedValue;
  }

  getPointDetailList(){
    
  }

}
