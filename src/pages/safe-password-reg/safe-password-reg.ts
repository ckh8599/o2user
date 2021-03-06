import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, Platform } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DeviceManagerProvider } from '../../providers/device-manager/device_manager';

import { LoginPage } from '../../pages/login/login';

import jsSHA from 'jssha'
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the SafePasswordRegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safe-password-reg',
  templateUrl: 'safe-password-reg.html',
})
export class SafePasswordRegPage {

  mdn: string;
  reg_type: string;
  sex_cd: string;
  pw: string ;
  email: string ;
  name: string ;
  birth: string ;
  tosList: Array<TosInfo>;
  tosInfo: TosInfo;
  pushUseYn: string;

  formGroup: FormGroup;
  exceptionAlert: string;

  jsonRegData: AssociationInfo;

  imei:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider, 
              public deviceManagerProvider: DeviceManagerProvider, 
              public toastCtrl: ToastController,
              public DbManager: DbManagerProvider,
              public events: Events,
              public dialogs: Dialogs,
              public platform: Platform) {
    this.mdn = navParams.get('mdn');
    this.reg_type = navParams.get('reg_type');
    this.sex_cd = navParams.get('sex_cd');
    this.pw = navParams.get('pw');
    this.email = navParams.get('email');
    this.name = navParams.get('name');
    this.birth = navParams.get('birth');
    this.tosList = navParams.get('tosList');
    this.pushUseYn = navParams.get('pushUseYn');
    this.jsonRegData = new AssociationInfo();

    this.formGroup = new FormGroup({
      pw: new FormControl('', [
                              Validators.required
                              , Validators.minLength(4)
                              , Validators.pattern('^(\\d+)$')
                            ]),
      pwConfirm: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafePasswordRegPage');
    this.setJsonRegData();
  }

  //입력 데이타 구성
  setJsonRegData(){
    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.pw);
    var out_pw = shaObj.getHash("HEX").toUpperCase();

    this.jsonRegData.REG_TYPE = this.reg_type;
    this.jsonRegData.MDN = this.mdn;
    this.jsonRegData.CUSTOMER_NM = this.name;
    this.jsonRegData.BIRTHDAY = this.birth;
    this.jsonRegData.EMAIL = this.email;
    this.jsonRegData.SEX_CD = this.sex_cd;
    this.jsonRegData.OUT_PW = out_pw;
    
    
    this.jsonRegData.DEVICE_TYPE = this.deviceManagerProvider.getDeviceType();
    this.jsonRegData.DEVICE_ID = this.deviceManagerProvider.getDeviceId();
    this.jsonRegData.DEVICE_TOKEN = ''; //디바이스 토큰은 firebase에서 푸시보내는것과 관련있음 나중에 deviceappcheck에서 넣는 로직있음 (현재 미구현)
    this.jsonRegData.EQP_MDL_CD = this.deviceManagerProvider.getEqpMdlCd();
    this.jsonRegData.EQP_SER_NUM = this.deviceManagerProvider.getEqpSerNum();
    this.jsonRegData.OS_VERSION = this.deviceManagerProvider.getOsVersion();
    this.deviceManagerProvider.getAppVersion().then(val => {
      this.jsonRegData.APP_VERSION = val;
    });
    this.jsonRegData.MINOR_AGREE_YN = 'Y';
    this.jsonRegData.PUSH_USE_YN = this.pushUseYn;

    this.jsonRegData.TOS_LIST = new Array<TosInfo>();
    for(let temp of this.tosList){
      this.tosInfo = new TosInfo();
      this.tosInfo.TOS_NO = temp.TOS_NO;
      this.tosInfo.AGREE_YN = temp.AGREE_YN;
      this.jsonRegData.TOS_LIST.push(this.tosInfo);
    }
    //this.jsonRegData.TOS_LIST = this.tosList;
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){
        this.imei = this.deviceManagerProvider.getImei(),
        this.jsonRegData.IMEI = this.imei; 
        console.log('jsonRegData -- ' + JSON.stringify(this.jsonRegData));
    }else{
      this.jsonRegData.IMEI = '-'; 
      console.log('jsonRegData -- ' + JSON.stringify(this.jsonRegData));
    }
  }

  //안심번호 건너뛰고 회원가입
  reg(){
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){
      this.dialogs.confirm('타인이 휴대폰번호로 포인트 임의사용 시 회사에서 책임지지 않습니다.','건너뛰기',['확인','취소']).then(idx => {//idx 1이면 ok 2면 cancel
        if(idx == 1){
          this.jsonRegData.PW_CHECK_TYPE = 'N';
          console.log('reg -- ' + JSON.stringify(this.jsonRegData));

          this.association();
        }
      });
    }else{
      if(confirm('타인이 휴대폰번호로 포인트 임의사용 시 회사에서 책임지지 않습니다.')){
        this.jsonRegData.PW_CHECK_TYPE = 'N';
        console.log('reg -- ' + JSON.stringify(this.jsonRegData));

        this.association();
      }
    }
    
    
  }

  //안심번호 설정 회원가입
  regWithPassWord(){
    
    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.formGroup.get('pw').value);
    var pay_pw = shaObj.getHash("HEX").toUpperCase();

    this.jsonRegData.PW_CHECK_TYPE = 'Y';
    this.jsonRegData.PAY_PW = pay_pw;
    console.log('regWithPassWord -- ' + JSON.stringify(this.jsonRegData));

    this.association();
  }

  association(){
    this.httpServiceProvider.association(this.jsonRegData).subscribe(data => {

      if(data['RESULT_CODE'] == 'EXPIRED_SESSION'){
        const toast = this.toastCtrl.create({
          message: '세션이 종료되었습니다.',
          duration: 2000
        });
        toast.present();

        this.events.publish('session_expire',true);
        return;
      }

      this.exceptionAlert = '';

      if(data['RESULT_CODE'] == '0'){
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('O2포인트 서비스 회원가입이 완료되었습니다.','회원가입완료');
          this.login(this.jsonRegData.MDN,this.jsonRegData.OUT_PW);
        }else{
          alert('O2포인트 서비스 회원가입이 완료되었습니다.');
          this.login(this.jsonRegData.MDN,this.jsonRegData.OUT_PW);
        }
        
      }else if(data['RESULT_CODE'] == 'ALREADY_USER'){
        const toast = this.toastCtrl.create({
          message: '이미 가입된 회원입니다. 아이디 찾기 또는 비밀번호 찾기를 해주세요.',
          duration: 5000
        });
        toast.present();
        this.navCtrl.setRoot(LoginPage);
      }else{
        this.exceptionAlert = '회원가입에 실패했습니다. 다시 시도해 주세요.';
      }
    });
  }

  login(mdn, out_pw){

    //로그인 정보 세팅(전화번호, 디바이스코드)
    this.httpServiceProvider.LoginByMdn(mdn,out_pw).subscribe(data => {
      var loginInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('로그인 정보 : '+JSON.stringify(loginInfo));
      // this.sessionId = loginInfo['SESSION_ID'];

      if(loginInfo['RESULT_CODE'] == '0'){
          this.DbManager.setData('sessionId',loginInfo['SESSION_ID']).then(data => {
            this.events.publish('isLogin',true);
          });
      }else{

        this.exceptionAlert = '로그인 실패.'
      }


      
    });
  }

}

export class AssociationInfo {
  REG_TYPE: string;
  MDN: string;
  CUSTOMER_NM: string;
  BIRTHDAY: string;
  EMAIL: string;
  SEX_CD: string;
  PW_CHECK_TYPE: string;
  OUT_PW: string;
  PAY_PW: string;
  IMEI: string;
  DEVICE_TYPE: string;
  DEVICE_ID: string;
  DEVICE_TOKEN: string;
  EQP_MDL_CD: string;
  EQP_SER_NUM: string;
  OS_VERSION: string;
  APP_VERSION: string;
  PUSH_USE_YN: string;
  MINOR_AGREE_YN: string;
  TOS_LIST: Array<Object>;
}

export class TosInfo {
  TOS_NO: string;
  AGREE_YN: string;
}