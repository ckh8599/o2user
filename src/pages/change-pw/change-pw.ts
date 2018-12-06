import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Dialogs } from '@ionic-native/dialogs';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the ChangePwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pw',
  templateUrl: 'change-pw.html'
})
export class ChangePwPage {

  sessionId: string;
  customerInfo: any;
  pre_pw: string;
  change_pw: string;
  change_pw_confirm: string;
  btnDisabled: boolean;

  view: string;

  checkVal: boolean;
  error_txt: string;

  constructor(public platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider, 
              public DbManager: DbManagerProvider,
              public dialogs: Dialogs) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.httpServiceProvider.setSessionId(this.sessionId);
      this.error_txt = '';
      this.view = 'input';
      this.btnDisabled = true;
      this.checkVal = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePwPage');
  }

  checkInput(){
    if(this.pre_pw != null && this.change_pw != null && this.change_pw_confirm != null){
      this.btnDisabled = false;
    }else{
      this.btnDisabled = true;
    }

  }

  changePw(){
    if(this.pre_pw != null && this.change_pw != null && this.change_pw_confirm != null){
      if(this.pre_pw == this.change_pw){
        this.error_txt = '이전 비밀번호와 변경 비밀번호는 달라야합니다.';
        this.checkVal = false;
        return;
      }
      if(this.change_pw != this.change_pw_confirm){
        this.error_txt = '변경 비밀번호가 일치하지 않습니다.';
        this.checkVal = false;
        return;
      }

      //pw 변경처리
      this.httpServiceProvider.pwChange('http://110.45.199.181/api/setting/PWChange',this.pre_pw,this.change_pw,this.change_pw_confirm).subscribe(data => {
      // this.httpServiceProvider.pwChange('http://110.45.199.181/api/setting/PWChange',
      // '73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C8',
      // '73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C7','73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C7').subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('PW변경 성공여부 : '+JSON.stringify(data));

        if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
          if(!this.platform.is('core') && !this.platform.is('mobileweb')){
            this.dialogs.alert('PW변경 성공');
          }else{
            alert('PW변경 성공');
          }

          this.view = 'result';
          this.checkVal = true;
        }else{
          if(!this.platform.is('core') && !this.platform.is('mobileweb')){
            this.dialogs.alert('오류발생');
          }else{
            alert('오류발생');
          }

          if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == 'INVALID_PASSWORD'){
            this.error_txt = '비밀번호가 맞지 않습니다.';
          }else{
            this.error_txt = '오류가 발생하였습니다.';
          }
          this.checkVal = false;
        }
      });
    }

  }

  goLogout(){
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){
      this.dialogs.alert('로그아웃 하거나 페이지 이동');
    }else{
      alert('로그아웃 하거나 페이지 이동');
    }
  }

}
