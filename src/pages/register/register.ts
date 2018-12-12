import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  tosData: any;
  tosList: any;
  checkMan: boolean;
  checkWoman: boolean;
  authAllCheck: boolean;

  exceptionAlert: string;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider, public toastCtrl: ToastController) {
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
    this.authAllCheck = false;

    //Tos 리스트 호출
    this.httpServiceProvider.tosSearch('A','A').subscribe(data => {
      this.tosData = data;
      console.log('Tos 정보 : '+JSON.stringify(this.tosData));

      if(this.tosData['RESULT_CODE'] == '0'){
        this.tosList = this.tosData['TOS_LIST'];
      } else {
        const toast = this.toastCtrl.create({
          message: '약관조회중 에러가 발생했습니다. 다시 시도해 주세요.',
          duration: 3000
        });
        toast.present();
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

  //약관보기
  openPolicy(tos_no, title){
    console.log("tos_no" + tos_no);
    this.navCtrl.push(PolicyPage, {'tos_no':tos_no, 'title':title});
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

  //약관 전체 동의
  changeAllCheck(){
    if(this.authAllCheck){

    }
  }

}
