import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the FindPwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-pw',
  templateUrl: 'find-pw.html',
})
export class FindPwPage {

  checkEmail:boolean;
  checkCell:boolean;

  emailExceptionAlert: string;
  emailFormGroup: FormGroup;

  cellExceptionAlert: string;
  cellFormGroup: FormGroup;

  mPath: number;
  sPath: number;
  interval;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider) {
    this.emailFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      cell: new FormControl('',Validators.required)
    });

    this.cellFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      cell: new FormControl('',Validators.required),
      auth: new FormControl('',Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPwPage');

    this.emailExceptionAlert = '';
    this.cellExceptionAlert = '';
    this.checkEmail = true;
    this.checkCell = false;
  }

  changeEmail(){
    if(this.checkEmail == true) this.checkCell = false;
    if(this.checkEmail == false) this.checkCell = true;
  }

  changeCell(){
    if(this.checkCell == true) this.checkEmail = false;
    if(this.checkCell == false) this.checkEmail = true;
  }

  //확인
  confirm(){
    var pw_search_type;
    var mdn;
    var customer_nm;
    var auth_number;

    if(this.checkEmail == true){
      pw_search_type = '01';
      mdn = this.emailFormGroup.get('cell').value;
      customer_nm = this.emailFormGroup.get('username').value;
    } else {
      pw_search_type = '02';
      mdn = this.cellFormGroup.get('cell').value;
      customer_nm = this.cellFormGroup.get('username').value;
      auth_number = this.cellFormGroup.get('auth').value;
    }

    this.httpServiceProvider.pWSearch(pw_search_type, mdn, customer_nm, auth_number).subscribe(data => {
      var findPwInfo = data;
      console.log('FindPwPage confirm : '+JSON.stringify(findPwInfo));

      if(findPwInfo['RESULT_CODE'] == 'INVALID_USER'){
        console.log('FindPwPage confirm : '+JSON.stringify(findPwInfo));
      }else if (findPwInfo['RESULT_CODE'] == 'INVALID_MDN'){
        this.emailExceptionAlert = '가입된 ID(휴대폰번호)가 아닙니다.';
      }else if (findPwInfo['RESULT_CODE'] == 'INVALID_USER_NAME'){
        this.emailExceptionAlert = '등록된 이름이 아닙니다.';
      }
    });
  }

  //휴대폰 인증
  cellAuthSend(){

    if(this.interval != undefined)  clearInterval(this.interval);
    this.mPath = 2;
    this.sPath = 59;
    this.startTimer();

  }

  //초 분 함수
  startTimer() {
    this.interval = setInterval(() => {
      if(this.sPath > 0 ) {
        this.sPath--;
      } else if (this.mPath > 0) {
        this.mPath--;
        this.sPath = 59;
      }
    },1000)
  }
}
