import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, ToastController } from 'ionic-angular';
import jsSHA from 'jssha'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


/**
 * Generated class for the TempPwResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temp-pw-reset',
  templateUrl: 'temp-pw-reset.html',
})
export class TempPwResetPage {

  exceptionAlert: string;
  formGroup: FormGroup;
  autoCheck: string;
  id: string;
  sessionId: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public DbManager: DbManagerProvider, 
              public httpServiceProvider: HttpServiceProvider,
              public viewCtrl: ViewController,
              public events: Events,
              public toastCtrl: ToastController) {

    this.formGroup = new FormGroup({
      pw: new FormControl('', [
        Validators.required
        , Validators.maxLength(25)
        , Validators.minLength(10)
        , Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]),
      pwConfirm: new FormControl('',[
        Validators.required
        , Validators.maxLength(25)
        , Validators.minLength(10)
        , Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])
    });

    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.httpServiceProvider.setSessionId(this.sessionId);
    });

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TempPwResetPage');
    this.autoCheck = this.navParams.get('autoCheck');
    this.id = this.navParams.get('id');
  }

  tempPwUpdate(){
    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.formGroup.get('pw').value);
    var out_pw_new = shaObj.getHash("HEX").toUpperCase();
    var shaObj2 = new jsSHA("SHA-256","TEXT");
    shaObj2.update(this.formGroup.get('pwConfirm').value);
    var out_pw_new2 = shaObj2.getHash("HEX").toUpperCase();

    //비밀번호 재설정
    this.httpServiceProvider.pwChange('', out_pw_new, out_pw_new2).subscribe(data => {

      if(data['RESULT_CODE'] == 'EXPIRED_SESSION'){
        const toast = this.toastCtrl.create({
          message: '세션이 종료되었습니다.',
          duration: 2000
        });
        toast.present();

        this.events.publish('session_expire',true);
        return;
      }

      var res = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('비밀번호 재설정 : '+JSON.stringify(res));
      // this.sessionId = this.loginInfo['SESSION_ID'];

      if(res['RESULT_CODE'] == '0'){
        this.events.publish('isLogin',true);
      }else{
        this.exceptionAlert = '비밀번호 재설정 오류.'
      }

    });
  }

}
