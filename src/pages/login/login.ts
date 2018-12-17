import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CertificationPage } from '../../pages/certification/certification';
import { FindIdPage } from '../../pages/find-id/find-id';
import { FindPwPage } from '../../pages/find-pw/find-pw';
import { PolicyPage } from '../../pages/policy/policy';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HomePage } from '../home/home';
import jsSHA from 'jssha'
import { TempPwResetPage } from '../../pages/temp-pw-reset/temp-pw-reset';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  check: string;
  buttonColor: string;
  exceptionAlert: string;
  formGroup: FormGroup;
  loginInfo: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public DbManager: DbManagerProvider, 
              public httpServiceProvider: HttpServiceProvider,
              public viewCtrl: ViewController,
              public events: Events) {
    this.formGroup = new FormGroup({
      id: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required,Validators.minLength(10)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.check = 'n';
    this.buttonColor = 'gray';
    this.exceptionAlert = '';
  }

  changeCheck(){
    if(this.check == 's') {
      this.check = 'n';
    } else if(this.check == 'n') {
      this.check = 's';
    }
  }

  onChangePw(pw){
    if(pw.length > 10){
      this.buttonColor = 'primary';
    }else{
      this.buttonColor = 'gray';
    }
  }

  openFindId(){
    this.navCtrl.push(FindIdPage);
  }

  openFindPw(){
    this.navCtrl.push(FindPwPage);
  }

  openCertification(){
    this.navCtrl.push(CertificationPage);
  }

  openPolicy(){
    this.navCtrl.push(PolicyPage, {'title':'개인정보처리방침','tos_no':'4'});
  }

  login(){
    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.formGroup.get('pw').value);
    var out_pw = shaObj.getHash("HEX").toUpperCase();

    //로그인 정보 세팅(전화번호, 디바이스코드)
    this.httpServiceProvider.LoginByMdn(this.formGroup.get('id').value,out_pw).subscribe(data => {
      this.loginInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('로그인 정보 : '+JSON.stringify(this.loginInfo));
      // this.sessionId = this.loginInfo['SESSION_ID'];

      if(this.loginInfo['RESULT_CODE'] == '0'){
        //임시비밀번호 상태라면 비밀번호 재설정 페이지로 이동
        if(this.loginInfo['TEMP_PW_YN'] == 'Y'){
          this.DbManager.setData('sessionId',this.loginInfo['SESSION_ID']).then(data => {
            if(this.check == 's'){
              this.DbManager.setData('autoLogin','Y').then(data => {console.log(data)});
              this.DbManager.setData('save_auth',{'save_out':this.loginInfo['OUT']}).then(data => {
                this.navCtrl.setRoot(TempPwResetPage);
              });
            }else{
              this.DbManager.setData('autoLogin','N').then(data => {console.log(data)});
              // this.events.publish('isLogin',true);
              this.navCtrl.setRoot(TempPwResetPage);
            }
            
          });
        }else{
          this.DbManager.setData('sessionId',this.loginInfo['SESSION_ID']).then(data => {
            if(this.check == 's'){
              this.DbManager.setData('autoLogin','Y').then(data => {console.log(data)});
              this.DbManager.setData('save_auth',{'save_out':this.loginInfo['OUT']}).then(data => {
                console.log(data);
                this.events.publish('isLogin',true);
              });
            }else{
              this.DbManager.setData('autoLogin','N').then(data => {console.log(data)});
              this.events.publish('isLogin',true);
            }
            
          });
        }
      }else{

        this.exceptionAlert = '로그인 실패.'
      }


      
    });
  }

}
