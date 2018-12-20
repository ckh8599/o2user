import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import jsSHA from 'jssha'

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
  btnDisabled: boolean;

  formGroup: FormGroup;
  exceptionAlert: string;
  pw: FormControl;
  pwConfirm: FormControl;

  constructor(public platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider, 
              public DbManager: DbManagerProvider,
              public dialogs: Dialogs,
              public fb: FormBuilder) {
                
    this.isSafe = false;
    this.btnDisabled = false;

    this.pw = new FormControl('', [
      Validators.required
      , Validators.minLength(4)
      , Validators.pattern('^(\\d+)$')
    ]),
    this.pwConfirm = new FormControl('', 
      [
      Validators.required
      , Validators.minLength(4)
      , Validators.pattern('^(\\d+)$')
    ]),

    this.formGroup = this.fb.group({
      password: this.fb.group({
        pw: this.pw,
        pwConfirm: this.pwConfirm,
      },
      {validator: pwMatcher}),
    });

    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.httpServiceProvider.setSessionId(this.sessionId);

      // 고객기본정보조회
      this.httpServiceProvider.getCustomerInfo().subscribe(data => {
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
    if(this.isSafe){
      this.formGroup.controls['password'].get('pw').setValue('');
      this.formGroup.controls['password'].get('pwConfirm').setValue('');
      this.btnDisabled = true;
    }else{
      this.btnDisabled = false;
    }

  }
  changeInput(){
    var pw:string = this.formGroup.controls['password'].get('pw').value;
    var pwConfirm:string = this.formGroup.controls['password'].get('pwConfirm').value;
    var regExp = new RegExp('^(\\d+)$');
    console.log(regExp.test(pw));
    console.log(regExp.test(pwConfirm));
    if(this.isSafe && (pw != pwConfirm || pw.length != 4 || pwConfirm.length != 4 || !regExp.test(pw) || !regExp.test(pwConfirm))){
      this.btnDisabled = true;
    }else{
      this.btnDisabled = false;
    }

  }

  updateSafePw(){
    let pw_check_type = this.isSafe?'Y':'N';

    var pw = this.formGroup.controls['password'].get('pw').value;
    var pwConfirm = this.formGroup.controls['password'].get('pwConfirm').value;

    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(pw);
    var out_pw = shaObj.getHash("HEX").toUpperCase();

    var shaObj2 = new jsSHA("SHA-256","TEXT");
    shaObj2.update(pwConfirm);
    var out_pw_confirm = shaObj2.getHash("HEX").toUpperCase();

    //안심비밀번호 변경처리
    this.httpServiceProvider.setPayPWChange(pw_check_type,out_pw,out_pw_confirm).subscribe(data => {
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
            this.dialogs.alert('안심 비밀번호가 등록되었습니다.');
          }else{
            alert('안심 비밀번호가 등록되었습니다.');
          }
          this.navCtrl.pop();
          
        }else{
          if(!this.platform.is('core') && !this.platform.is('mobileweb')){
            this.dialogs.alert('안심 비밀번호가 해제되었습니다.');
          }else{
            alert('안심 비밀번호가 해제되었습니다.');
          }
          this.navCtrl.pop();
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

export const pwMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const pw = control.get('pw');
  const pwConfirm = control.get('pwConfirm');
  if (!pw || !pwConfirm) return null;
  return pw.value === pwConfirm.value ? null : { nomatch: true };
};
