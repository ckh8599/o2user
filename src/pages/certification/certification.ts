import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CertificationConfirmPage } from '../../pages/certification-confirm/certification-confirm';
import { RegisterPage } from '../../pages/register/register';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the CertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certification',
  templateUrl: 'certification.html',
})
export class CertificationPage {

  exceptionAlert: string;
  formGroup: FormGroup;

  mPath: number;
  sPath: number;
  interval;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServiceProvider: HttpServiceProvider, public toastCtrl: ToastController) {
    this.formGroup = new FormGroup({
      cell: new FormControl('',Validators.required),
      auth: new FormControl('',Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationPage');
    console.log(this.interval);

    this.exceptionAlert = '';
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

  //인증번호 발송 버튼
  sendSms(){
    //휴대폰 인증번호 요청
    this.httpServiceProvider.authNumberSend(this.formGroup.get('cell').value).subscribe(data => {
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

  //확인버튼
  confirm(){

    //휴대폰 인증번호 요청
    this.httpServiceProvider.authNumberConfirm(this.formGroup.get('cell').value, this.formGroup.get('auth').value).subscribe(data => {
      console.log('휴대폰 인증번호 와 MDN 확인 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
        if(data['CONFIRM_YN'] != 'Y'){
          this.exceptionAlert = '인증번호가 맞지 않습니다. 인증번호를 확인해 주세요.';
        }else{
          //회원 존재여부를 확인
          this.httpServiceProvider.customerExist(this.formGroup.get('cell').value).subscribe(data => {
            console.log('회원 존재여부를 확인 : '+JSON.stringify(data));
      
            if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
              if(data['USER_TYPE'] == '1'){
                this.navCtrl.setRoot(CertificationConfirmPage, {'mdn':this.formGroup.get('cell').value});
              }else{
                this.navCtrl.setRoot(RegisterPage, {'mdn':this.formGroup.get('cell').value});
              }
            }else{
              alert("인증번호를 발송중 에러가 발생했습니다. 다시 시도해 주세요.");
            }
          });
        }
      }else{
        alert("인증번호를 발송중 에러가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  }

}
