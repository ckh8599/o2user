import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ChangePwPage } from '../../pages/change-pw/change-pw';
import { ChangeIdPage } from '../../pages/change-id/change-id';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

  @ViewChild('input_confirm') input_confirm;

  sessionId: string;
  customerInfo: any;
  login_id: string;

  btnDisabled: boolean;
  visibleAlertText: boolean;

  radioCheck: boolean;

  email_header: string;
  email_tail: string;
  customer_name: string;
  birthday: string;
  input_pw: string;
  pwConfirm: boolean;
  sex_cd: string;

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
      this.radioCheck = true;
      this.login_id = '1234567890';
      this.email_header = '';
      this.email_tail = '';
      this.customer_name = '';
      this.birthday = '';
      this.pwConfirm = true;
      this.sex_cd='1';

      //고객기본정보조회
      this.httpServiceProvider.getCustomerInfo().subscribe(data => {
        this.customerInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('고객 기본정보 조회 : '+JSON.stringify(this.customerInfo));
        this.login_id = this.customerInfo['MDN'];
        let email: string[] = this.customerInfo['EMAIL'].split('@');
        if(email.length == 2){
          this.email_header = email[0];
          this.email_tail = email[1];
        }
  
        this.customer_name = this.customerInfo['CUSTOMER_NM'];
        this.birthday = this.customerInfo['BIRTHDAY'];
        this.sex_cd = this.customerInfo['SEX_CD'];
        // if(this.customerInfo['PW_CHECK_TYPE'] != null && this.customerInfo['PW_CHECK_TYPE'] == 'Y'){
          
        // }else{
        //   this.btnDisabled = false;
        // }
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  goChangePwPage(){
    this.navCtrl.push(ChangePwPage);
  }

  goChangeIdPage(){
    this.navCtrl.push(ChangeIdPage,{'customer_nm':this.customer_name});
  }

  selSexCd(type){
    if(type == '1'){
      this.radioCheck = true;
      this.sex_cd = '1';
    }else{
      this.radioCheck = false;
      this.sex_cd = '2';
    }
  }

  checkInput(){
    if(this.input_pw != null){
      this.btnDisabled = false;
    }else{
      this.btnDisabled = true;
    }
  }

  updateCustomerInfo(){
    if(this.input_pw != null && this.input_pw.length < 10){
      this.pwConfirm = false;
      this.input_confirm.setFocus();
      return;
    }

    this.pwConfirm = true;

    let email = this.email_header+'@'+this.email_tail;

    //안심비밀번호 변경처리
    this.httpServiceProvider.customerInfoChange(this.login_id,this.customer_name,this.birthday, this.sex_cd, email, '73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C7').subscribe(data => {
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('회원정보 업데이트 성공여부 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
       
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('회원정보 업데이트 성공');
        }else{
          alert('회원정보 업데이트 성공');
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

  onChange(email_tail: string) {
    console.log('email_tail == ' + email_tail);
    this.email_tail = email_tail;
  }

}
