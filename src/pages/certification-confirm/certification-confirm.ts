import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../../pages/register/register';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the CertificationConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certification-confirm',
  templateUrl: 'certification-confirm.html',
})
export class CertificationConfirmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationConfirmPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
