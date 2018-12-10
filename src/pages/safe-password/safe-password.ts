import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the SafePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safe-password',
  templateUrl: 'safe-password.html'
})
export class SafePasswordPage {

  @ViewChild('input_confirm') input_confirm;

  sessionId: string;
  customerInfo: any;
  isSafe: boolean;
  input_pw: string;
  input_pw_confirm: string;
  btnDisabled: boolean;

  pwValidate: boolean;
  pwConfirm: boolean;

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
      this.btnDisabled = true;
      this.pwConfirm = true;
      this.isSafe = false;
  
      //고객기본정보조회
      this.httpServiceProvider.getCustomerInfo('http://110.45.199.181/api/customermain/CustomerInfoSearch').subscribe(data => {
        this.customerInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('고객 기본정보 조회 : '+JSON.stringify(this.customerInfo));
        // this.customer_nm = this.customerInfo['CUSTOMER_NM'];
  
        if(this.customerInfo['PW_CHECK_TYPE'] != null && this.customerInfo['PW_CHECK_TYPE'] == 'Y'){
          this.isSafe = true;
        }else{
          this.isSafe = false;
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafePasswordPage');
  }

  toggleClick(){
    if(!this.isSafe){
      this.input_pw = '';
      this.input_pw_confirm = '';

      this.btnDisabled = false;
    }
  }

  checkInput(){
    // this.pwValidate = false;

    if(this.input_pw != null && this.input_pw_confirm != null){
      this.btnDisabled = false;
    }else{
      this.btnDisabled = true;
    }

  }

  updateSafePw(){
    if(this.input_pw != this.input_pw_confirm){
      this.pwConfirm = false;
      this.input_confirm.setFocus();
      return;
    }

    this.pwConfirm = true;

    let pw_check_type = this.isSafe?'Y':'N';

    //안심비밀번호 변경처리
    this.httpServiceProvider.setPayPWChange('http://110.45.199.181/api/setting/PayPWChange',pw_check_type,this.input_pw,this.input_pw_confirm).subscribe(data => {
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('안심 비밀번호 변경 성공여부 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
        if(pw_check_type == 'Y'){
          if(!this.platform.is('core') && !this.platform.is('mobileweb')){
            this.dialogs.alert('안심 비밀번호 등록 성공');
          }else{
            alert('안심 비밀번호 등록 성공');
          }
          
        }else{
          if(!this.platform.is('core') && !this.platform.is('mobileweb')){
            this.dialogs.alert('안심 비밀번호 해제 성공');
          }else{
            alert('안심 비밀번호 해제 성공');
          }
          
        }
      }else{
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('오류발생');
        }else{
          alert('오류발생');
        }
      }
    });

  }

}
