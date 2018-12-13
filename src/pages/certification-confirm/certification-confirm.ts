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

  mdn: string;
  user_type: string;
  reg_type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mdn = navParams.get('mdn');
    this.user_type = navParams.get('user_type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationConfirmPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  //기존에 간편/정 회원을 무시하고 재가입
  register(){
    if(this.user_type == '1'){
      this.reg_type = '02';   //정회원으로 가입되어 있으며 본인이 아닌경우
    } else if(this.user_type == '2'){
      this.reg_type = '04';   //간편회원으로 가입되어 있으며 본인이 아닌겨우
    }
    this.navCtrl.push(RegisterPage, {'mdn':this.mdn, 'reg_type':this.reg_type});
  }

  //간편회원에서 정회원으로 가입
  registerUpgrade(){
    this.reg_type = '03';     //간편회원에서 정회원으로 가입
    this.navCtrl.push(RegisterPage, {'mdn':this.mdn, 'reg_type':this.reg_type});
  }
}
