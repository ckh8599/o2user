import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import jsSHA from 'jssha'
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the ServiceOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-out',
  templateUrl: 'service-out.html'
})
export class ServiceOutPage {

  @ViewChild('input_pw') input_pw;

  sessionId: string;
  loginPw: string;
  btnDisabled: boolean;
  pwConfirm: boolean;
  exceptionAlert: string;

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
      this.loginPw = '';
      this.btnDisabled = true;
      this.pwConfirm = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOutPage');
  }

  goOut(){
    if(this.loginPw != null){
      //자리수가 안맞는지
      if(this.loginPw.length < 10){
        this.exceptionAlert='비밀번호가 맞지 않습니다.';
        return;
      }
      //영문과 숫자만 사용한게 맞는지
      // if(){

      // }

      //validate check 통과시
      if(!this.platform.is('core') && !this.platform.is('mobileweb')){
        if(this.dialogs.confirm('회원 탈퇴하시면 보유하신 포인트/스탬프/캐시가 초기화됩니다.','회원 탈퇴')){
          this.serviceOut();
        }
      }else{
        if(confirm('회원 탈퇴하시면 보유하신 포인트/스탬프/캐시가 초기화됩니다.')){
          this.serviceOut();
        }
      }
      
    }
  }

  serviceOut(){
    var shaObj = new jsSHA("SHA-256","TEXT");
    shaObj.update(this.loginPw);
    var out_pw = shaObj.getHash("HEX").toUpperCase();

    //탈퇴처리
    this.httpServiceProvider.ServiceClose(out_pw).subscribe(data => {
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('안심 비밀번호 변경 성공여부 : '+JSON.stringify(data));

      if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('회원 탈퇴가 완료되었습니다.','회원 탈퇴');
          
          
        }else{
          alert('회원 탈퇴가 완료되었습니다.');
        }

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
      }else{
        if(!this.platform.is('core') && !this.platform.is('mobileweb')){
          this.dialogs.alert('오류발생');
        }else{
          alert('오류발생');
        }
        this.exceptionAlert = "오류";
      }
    });
  }

  inputChange(){
    if(this.loginPw.length > 0){
      this.btnDisabled = false;
    }else{
      this.btnDisabled = true;
    }
  }

}
