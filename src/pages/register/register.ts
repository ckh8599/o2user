import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { PolicyPage } from '../../pages/policy/policy';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  mdn: string;
  tosList: any;
  checkMan: boolean;
  checkWoman: boolean;

  exceptionAlert: string;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
    this.mdn = navParams.get('mdn');
    this.mdn = '01046348599';
    this.formGroup = new FormGroup({
      pw: new FormControl('', [
                              Validators.required
                              , Validators.maxLength(25)
		                          , Validators.minLength(10)
		                          , Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                            ]),
      pwConfirm: new FormControl('', Validators.required),
      email: new FormControl('', [
                              Validators.required
                              , Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                            ]),
      name: new FormControl('', Validators.required),
      birth: new FormControl('', [
                              Validators.required
                              , Validators.maxLength(8)
                              , Validators.minLength(8)
                            ])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.exceptionAlert = '';
    this.checkMan = true;
    this.checkWoman = false;

    this.httpServiceProvider.tosSearch('Y','Y').subscribe(data => {
      this.tosList = data;
      console.log('Tos 정보 : '+JSON.stringify(this.tosList));
      // this.sessionId = this.loginInfo['SESSION_ID'];

      if(this.tosList['RESULT_CODE'] == '0'){
        
      }else{

        this.exceptionAlert = '로그인 실패.'
      }


      
    });

  }

  changeMan(){
    if(this.checkMan == true) this.checkWoman = false;
    if(this.checkMan == false) this.checkWoman = true;
  }

  changeWoman(){
    if(this.checkWoman == true) this.checkMan = false;
    if(this.checkWoman == false) this.checkMan = true;
  }

  openPolicy(){
    this.navCtrl.push(PolicyPage);
  }

  reg(){
    console.log(this.formGroup.get('pw').value);
    console.log(this.formGroup.get('pwConfirm').value);
  }

  isMatching(group: FormGroup){

    console.log("password check");

    var pw = group.controls['pw'].value;
    var pwConfirm = group.controls['pwConfirm'].value;
    if((pw && pwConfirm) && (pw != pwConfirm)){
      console.log("mismatch");
      return { "pw_mismatch": true };
    } else{
      return null;
    }
  }

  static MatchPassword(AC: AbstractControl) {
    const pw = AC.get('pw').value // to get value in input tag
    const pwConfirm = AC.get('pwConfirm').value // to get value in input tag
     if(pw != pwConfirm) {
         console.log('false');
         AC.get('pwConfirm').setErrors( { MatchPassword: true } )
     } else {
         console.log('true')
         AC.get('pwConfirm').setErrors(null);
     }
  }  

}
