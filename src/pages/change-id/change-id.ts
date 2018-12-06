import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigPage } from '../../pages/config/config';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';

/**
 * Generated class for the ChangeIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-id',
  templateUrl: 'change-id.html'
})
export class ChangeIdPage {

  @ViewChild('input_confirm1') input_confirm1;
  @ViewChild('input_confirm2') input_confirm2;

  @Input() timeInSeconds: number = 10;
  timer: CountdownTimer;

  sessionId: string;
  customerInfo: any;
  mobile_num: string;
  auth_num: string;
  btnDisabled: boolean;

  authFail: boolean;
  customer_nm: string;
  view: string;

  auth_timeout: boolean;

  constructor(public platform: Platform, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider, 
              public DbManager: DbManagerProvider,
              public dialogs: Dialogs) {
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      console.log("sessionId????????? : " + data);
      this.httpServiceProvider.setSessionId(data);
      this.sessionId = data;
    });
    this.btnDisabled = true;
    this.authFail = false;
    this.customer_nm = navParams.get('customer_nm');
    this.mobile_num ='';
    this.view = 'input';
    this.auth_timeout = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeIdPage');
  }

  checkInput(){
    if(this.mobile_num != null){
      this.btnDisabled = false;
    }else{
      this.btnDisabled = true;
    }

  }

  pwCertification(){
    //휴대폰 체크 정규식 필요
    if(this.mobile_num.length < 10){
      this.input_confirm1.setFocus();
      return;
    }

    this.authFail = false;

    //휴대폰 인증번호 요청
    this.httpServiceProvider.authNumberSend('http://110.45.199.181/api/customer/AuthNumberSend',this.mobile_num).subscribe(data => {
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('휴대폰 인증번호 요청 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('휴대폰 인증번호 요청 성공');
        }else{
          alert('휴대폰 인증번호 요청 성공');
        }
        this.initTimer();
        this.startTimer();
      }else{
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('오류발생');
        }else{
          alert('오류발생');
        }
      }
    });
  }

  changeId(){
    if(this.mobile_num != null && this.mobile_num.length < 10){
      this.authFail = false;
      this.input_confirm2.setFocus();
      return;
    }

    if(this.auth_timeout){
      return;
    }

    this.authFail = true;

    //휴대폰번호 변경처리
    this.httpServiceProvider.idChange('http://110.45.199.181/api/setting/IDChange',this.mobile_num,this.customer_nm,this.auth_num).subscribe(data => {
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('ID변경 성공여부 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('ID변경 성공');
        }else{
          alert('ID변경 성공');
        }

        this.view = 'result';
        this.authFail = false;
      }else{
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('오류발생');
        }else{
          alert('오류발생');
        }
        this.authFail = true;
      }
    });

  }

  goLogout(){
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){
      this.dialogs.alert('로그아웃처리 or 환경설정이동 해야함');
    }else{
      alert('로그아웃처리 or 환경설정이동 해야함');
    }
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <CountdownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.auth_timeout = false;
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
        this.timer.displayTime = '유효시간 만료 00:00';
        this.auth_timeout = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return '유효시간 '+ minutesString + ':' + secondsString;
  }

}

export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}
