import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { FindPwDetailPage } from '../../pages/find-pw-detail/find-pw-detail';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider, public toastCtrl: ToastController) {
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
  }

  changeEmail(type){
    if(type =='1'){
      this.checkEmail = true;
    }else{
      this.checkEmail = false;
    }
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

      this.httpServiceProvider.pWSearch(pw_search_type, mdn, customer_nm, auth_number).subscribe(data => {
        var findPwInfo = data;
        console.log('FindPwPage confirm : '+JSON.stringify(findPwInfo));
        if(findPwInfo['RESULT_CODE'] == '0'){
          this.navCtrl.setRoot(FindPwDetailPage,{'type':'email','res_msg':findPwInfo['EMAIL']});
        }else if(findPwInfo['RESULT_CODE'] == 'INVALID_USER'){
          this.emailExceptionAlert = '등록된 사용자가 아닙니다. 회원가입을 또는 고객센터로 문의해 주시기 바랍니다.';
        }else if (findPwInfo['RESULT_CODE'] == 'INVALID_MDN'){
          this.emailExceptionAlert = '가입된 ID(휴대폰번호)가 아닙니다.';
        }else if (findPwInfo['RESULT_CODE'] == 'INVALID_USER_NAME'){
          this.emailExceptionAlert = '등록된 이름이 아닙니다.';
        }
      });

    } else {
      pw_search_type = '02';
      mdn = this.cellFormGroup.get('cell').value;
      customer_nm = this.cellFormGroup.get('username').value;
      auth_number = this.cellFormGroup.get('auth').value;

      this.httpServiceProvider.pWSearch(pw_search_type, mdn, customer_nm, auth_number).subscribe(data => {
        var findPwInfo = data;
        console.log('FindPwPage confirm : '+JSON.stringify(findPwInfo));
        
        if(findPwInfo['RESULT_CODE'] == '0'){
          this.navCtrl.setRoot(FindPwDetailPage,{'type':'phone','res_msg':findPwInfo['MDN']});
        }else if(findPwInfo['RESULT_CODE'] == 'INVALID_USER'){
          this.cellExceptionAlert = '등록된 사용자가 아닙니다. 회원가입을 또는 고객센터로 문의해 주시기 바랍니다.';
        }else if (findPwInfo['RESULT_CODE'] == 'INVALID_MDN'){
          this.cellExceptionAlert = '가입된 ID(휴대폰번호)가 아닙니다.';
        }else if (findPwInfo['RESULT_CODE'] == 'INVALID_USER_NAME'){
          this.cellExceptionAlert = '등록된 이름이 아닙니다.';
        }
      });
    }

    
  }

  //휴대폰 인증
  cellAuthSend(){

     //휴대폰 인증번호 요청
     this.httpServiceProvider.authNumberSend(this.cellFormGroup.get('cell').value).subscribe(data => {
      console.log('휴대폰 인증번호 요청 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
        if(this.interval != undefined)  clearInterval(this.interval);
        this.mPath = 2;
        this.sPath = 59;
        this.startTimer();

        const toast = this.toastCtrl.create({
          message: '인증번호가 발송되었습니다.',
          duration: 2000
        });
        toast.present();

      }else{
        const toast = this.toastCtrl.create({
          message: 'SMS 발송중 에러가 발생했습니다. 다시 시도해 주세요.',
          duration: 3000
        });
        toast.present();
      }
    });

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
