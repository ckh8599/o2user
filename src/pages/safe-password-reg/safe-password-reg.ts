import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DeviceManagerProvider } from '../../providers/device-manager/device_manager';

import { LoginPage } from '../../pages/login/login';

import jsSHA from 'jssha'

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

  formGroup: FormGroup;
  exceptionAlert: string;

  jsonRegData: AssociationInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider, public deviceManagerProvider: DeviceManagerProvider, public toastCtrl: ToastController) {
    this.mdn = navParams.get('mdn');
    this.reg_type = navParams.get('reg_type');
    this.sex_cd = navParams.get('sex_cd');
    this.pw = navParams.get('pw');
    this.email = navParams.get('email');
    this.name = navParams.get('name');
    this.birth = navParams.get('birth');
    this.tosList = navParams.get('tosList');
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
    this.jsonRegData.IMEI = this.deviceManagerProvider.getImei();
    this.jsonRegData.DEVICE_TYPE = this.deviceManagerProvider.getDeviceType();
    this.jsonRegData.DEVICE_ID = this.deviceManagerProvider.getDeviceId();
    this.jsonRegData.DEVICE_TOKEN = this.deviceManagerProvider.getDeviceToken();
    this.jsonRegData.EQP_MDL_CD = this.deviceManagerProvider.getEqpMdlCd();
    this.jsonRegData.EQP_SER_NUM = this.deviceManagerProvider.getEqpSerNum();
    this.jsonRegData.OS_VERSION = this.deviceManagerProvider.getOsVersion();
    this.jsonRegData.APP_VERSION = this.deviceManagerProvider.getAppVersion();
    this.jsonRegData.MINOR_AGREE_YN = 'Y';

    this.jsonRegData.TOS_LIST = new Array<TosInfo>();
    for(let temp of this.tosList){
      this.tosInfo = new TosInfo();
      this.tosInfo.TOS_NO = temp.TOS_NO;
      this.tosInfo.AGREE_YN = temp.AGREE_YN;
      this.jsonRegData.TOS_LIST.push(this.tosInfo);
    }
    //this.jsonRegData.TOS_LIST = this.tosList;
    console.log('jsonRegData -- ' + JSON.stringify(this.jsonRegData));
  }

  //안심번호 건너뛰고 회원가입
  reg(){
    this.jsonRegData.PW_CHECK_TYPE = 'N';
    console.log('reg -- ' + JSON.stringify(this.jsonRegData));
    
    this.httpServiceProvider.association(this.jsonRegData).subscribe(data => {

      this.exceptionAlert = '';

      if(data['RESULT_CODE'] == '0'){

        //로그인 로직 넣기
        
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

  //안심번호 설정 회원가입
  regWithPassWord(){
    
    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.formGroup.get('pw').value);
    var pay_pw = shaObj.getHash("HEX").toUpperCase();

    this.jsonRegData.PW_CHECK_TYPE = 'Y';
    this.jsonRegData.PAY_PW = this.formGroup.get('pay_pw').value;
    console.log('regWithPassWord -- ' + JSON.stringify(this.jsonRegData));
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