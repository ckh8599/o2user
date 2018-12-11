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
      this.DbManager.setData('autoLogin','N').then(data => {console.log(data)});
    } else if(this.check == 'n') {
      this.check = 's';
      this.DbManager.setData('autoLogin','Y').then(data => {console.log(data)});
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
    this.navCtrl.push(PolicyPage, {'sdf':''});
  }

  login(){
    //로그인 정보 세팅(전화번호, 디바이스코드)
    this.httpServiceProvider.setLoginInfo(this.formGroup.get('id').value,'73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C7');
    // this.httpServiceProvider.setLoginInfo(this.mdn,this.out_pw);

    this.httpServiceProvider.LoginByMdn('http://110.45.199.181/api/customermain/LoginByMdn').subscribe(data => {
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
        this.DbManager.setData('sessionId',this.loginInfo['SESSION_ID']).then(data => {
          if(this.check == 's'){
            this.DbManager.setData('save_auth',{'save_mdn':this.formGroup.get('id').value,'save_out_pw':'73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C7'}).then(data => {
              console.log(data);
              this.events.publish('isLogin',true);
            });
          }else{
            this.events.publish('isLogin',true);
          }
          
        });
      }else{

        this.exceptionAlert = '로그인 실패.'
      }


      
    });
  }

}
