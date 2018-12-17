import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the FindIdDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-id-detail',
  templateUrl: 'find-id-detail.html',
})
export class FindIdDetailPage {

  msg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.msg = navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindIdDetailPage');
  }

  confirm(){
    this.navCtrl.setRoot(LoginPage);
  }

}
