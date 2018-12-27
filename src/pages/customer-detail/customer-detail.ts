import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePwPage } from '../../pages/change-pw/change-pw';
import { ChangeIdPage } from '../../pages/change-id/change-id';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import jsSHA from 'jssha'

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

  email: string;
  email_header: string;
  email_tail: string;
  customer_name: string;
  birthday: string;
  input_pw: string;
  pwConfirm: boolean;
  sex_cd: string;

  exceptionAlert: string;
  formGroup: FormGroup;

  constructor(public platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider,
              public DbManager: DbManagerProvider, 
              public dialogs: Dialogs,
              public events: Events,
              public toastCtrl: ToastController) {

    this.formGroup = new FormGroup({

      email: new FormControl('', [
                              Validators.required
                              , Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                            ]),
      name: new FormControl('', [
                              Validators.required
                              , Validators.pattern('^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$')
                            ]),
      birth: new FormControl('', [
                              Validators.required
                              , Validators.minLength(8)
                              , Validators.pattern('^(\\d+)$')
                            ]),
      pw: new FormControl('', [
                              Validators.required
                              , Validators.maxLength(25)
                              , Validators.minLength(10)
                              , Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                            ])
    });

    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.httpServiceProvider.setSessionId(this.sessionId);
      this.btnDisabled = true;
      this.radioCheck = true;
      this.login_id = '';
      this.email_header = '';
      this.email_tail = '';
      this.customer_name = '';
      this.birthday = '';
      this.pwConfirm = true;
      this.sex_cd='';

      //고객기본정보조회
      this.httpServiceProvider.getCustomerInfo().subscribe(data => {

        if(data['RESULT_CODE'] == 'EXPIRED_SESSION'){
          const toast = this.toastCtrl.create({
            message: '세션이 종료되었습니다.',
            duration: 2000
          });
          toast.present();
  
          this.events.publish('session_expire',true);
          return;
        }
        this.customerInfo = data;
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('고객 기본정보 조회 : '+JSON.stringify(this.customerInfo));
        
        this.login_id = this.customerInfo['MDN'];
        this.email = this.customerInfo['EMAIL'];

        /*
        let email: string[] = this.customerInfo['EMAIL'].split('@');
        if(email.length == 2){
          this.email_header = email[0];
          this.email_tail = email[1];
        }
        */
  
        this.customer_name = this.customerInfo['CUSTOMER_NM'];
        this.birthday = this.customerInfo['BIRTHDAY'];
        this.sex_cd = this.customerInfo['SEX_CD'];
        this.radioCheck = this.sex_cd == '1'?true:false;
        
          
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
    //if(this.input_pw != null && this.input_pw.length < 10){
    //  this.pwConfirm = false;
    //  this.input_confirm.setFocus();
    //  return;
    //}

    //this.pwConfirm = true;

    //let email = this.email_header+'@'+this.email_tail;
    let email = this.email;

    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.input_pw);
    var out_pw = shaObj.getHash("HEX").toUpperCase();

    //개인정보 변경처리
    this.httpServiceProvider.customerInfoChange(this.login_id,this.customer_name,this.birthday, this.sex_cd, email, out_pw).subscribe(data => {
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('회원정보 업데이트 성공여부 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] == 'EXPIRED_SESSION'){
        const toast = this.toastCtrl.create({
          message: '세션이 종료되었습니다.',
          duration: 2000
        });
        toast.present();

        this.events.publish('session_expire',true);
        return;
      }

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
       
        const toast = this.toastCtrl.create({
          message: '회원정보를 변경하였습니다.',
          duration: 3000
        });
        toast.present();
          
      }else if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == 'INVALID_PASSWORD') {
        this.exceptionAlert = '비밀번호를 확인해 주세요.';
      }else  {
        this.exceptionAlert = '회워정보 변경중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.';
      }
    });

  }

  onChange(email_tail: string) {
    console.log('email_tail == ' + email_tail);
    this.email_tail = email_tail;
  }

}
