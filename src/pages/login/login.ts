import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CertificationPage } from '../../pages/certification/certification';
import { FindIdPage } from '../../pages/find-id/find-id';
import { FindPwPage } from '../../pages/find-pw/find-pw';
import { PolicyPage } from '../../pages/policy/policy';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  check: string;
  buttonColor: string;
  exceptionAlert: string;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = new FormGroup({
      id: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required,Validators.minLength(10)])
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.check = 'n';
    this.buttonColor = 'gray';
    this.exceptionAlert = '';
  }

  changeCheck(){
    if(this.check == 's') {
      this.check = 'n';
    } else if(this.check == 'n') {
      this.check = 's';
    }
  }

  onChangePw(pw){
    if(pw.length > 10){
      this.buttonColor = 'primary';
    }else{
      this.buttonColor = 'gray';
    }
  }

  openFindId(){
    this.navCtrl.push(FindIdPage);
  }

  openFindPw(){
    this.navCtrl.push(FindPwPage);
  }

  openCertification(){
    this.navCtrl.push(CertificationPage);
  }

  openPolicy(){
    this.navCtrl.push(PolicyPage);
  }

  login(){
    this.exceptionAlert = '가입된 휴대폰 번호가 아닙니다.'
  }
}
