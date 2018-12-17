import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the FindPwDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-pw-detail',
  templateUrl: 'find-pw-detail.html',
})
export class FindPwDetailPage {

  res_msg: string;
  infomation_text: string;
  text_type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.res_msg = navParams.get('res_msg');
    this.text_type = navParams.get('type');

    if(this.text_type =='email'){
      this.infomation_text = '회원가입 시 등록한 이메일 주소로 임시 비밀번호가 재발급되었습니다.';
    }else{
      this.infomation_text = '인증 받으신 휴대폰으로 임시 비밀번호가 재발급되었습니다.';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPwDetailPage');
  }

  confirm(){
    this.navCtrl.setRoot(LoginPage);
  }

}
