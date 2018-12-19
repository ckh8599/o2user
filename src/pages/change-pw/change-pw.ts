import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Dialogs } from '@ionic-native/dialogs';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { LoginPage } from '../login/login';
import jsSHA from 'jssha'

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

  exceptionAlert: string;
  formGroup: FormGroup;

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

    this.formGroup = new FormGroup({
      pw: new FormControl('', [
        Validators.required
        , Validators.minLength(10)
      ]),
      newPw: new FormControl('', [
        Validators.required
        , Validators.maxLength(25)
        , Validators.minLength(10)
        , Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]),
      newPwConfirm: new FormControl('', [Validators.required, this.equalto('newPw')])
    });
    
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid)
            return {'equalTo': {isValid}};
        else
            return null;
    };
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

      var shaObj = new jsSHA("SHA-256","TEXT");
      shaObj.update(this.pre_pw);
      var sha_pre_pw = shaObj.getHash("HEX");
      shaObj.update(this.change_pw);
      var sha_change_pw = shaObj.getHash("HEX");
      shaObj.update(this.change_pw_confirm);
      var sha_change_pw_confirm = shaObj.getHash("HEX");
      
      console.log('sha_pre_pw -- ' + sha_pre_pw);
      console.log('sha_change_pw -- ' + sha_change_pw);
      console.log('sha_change_pw_confirm -- ' + sha_change_pw_confirm);

      //pw 변경처리
      this.httpServiceProvider.pwChange(sha_pre_pw,sha_change_pw,sha_change_pw_confirm).subscribe(data => {
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
          /*
          if(!this.platform.is('core') && !this.platform.is('mobileweb')){
            this.dialogs.alert('오류발생');
          }else{
            alert('오류발생');
          }
          */
          if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == 'INVALID_PASSWORD'){
            this.error_txt = '현재 비밀번호를 확인해주세요.';
          }else{
            this.error_txt = '비밀번호 변경중 에러가 발생했습니다. 잠시후 다시 시도해 주세요.';
          }
          this.checkVal = false;
        }
      });
    }

  }

  goLogout(){
    
    this.DbManager.setData('autoLogin','N').then(data => {
      console.log(data)
      this.DbManager.setData('save_auth','').then(data2 => {
        console.log(data2)
        this.DbManager.setData('save_customerMainSearch','').then(data3 => {
          console.log(data3)
          this.DbManager.setData('sessionId','').then(data4 => {
            console.log(data4)
            this.DbManager.setData('save_barcode','').then(data5 => {
              console.log(data5)
            });
          });
        });
      });
    });
    
    this.navCtrl.setRoot(LoginPage);
  }

}
