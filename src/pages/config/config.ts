import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { TosDetailPage } from '../tos-detail/tos-detail';
import { AppVersion } from '@ionic-native/app-version';
import { Dialogs } from '@ionic-native/dialogs';
import { SafePasswordPage } from '../../pages/safe-password/safe-password';
import { CustomerDetailPage } from '../../pages/customer-detail/customer-detail';
import { ServiceOutPage } from '../../pages/service-out/service-out';
import { DbManagerProvider } from '../../providers/db-manager/db-manager';
import { LoginPage } from '../../pages/login/login';
import { DeviceManagerProvider } from '../../providers/device-manager/device_manager';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  isPush: boolean = false;
  isMarketing: boolean = false;
  isLocation: boolean = false;
  location_tos_no: number;
  marketing_tos_no: number;
  push_tos_no: number;
  tosPushDetalUrl: string;
  tosMarketingDetalUrl: string;
  tosLocationDetalUrl: string;
  sessionId: string;
  TOSInfo: any;
  autoLogin: boolean;
  appVersion: string;

  constructor(public platform: Platform,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpServiceProvider: HttpServiceProvider,
              public deviceManagerProvider: DeviceManagerProvider, 
              public DbManager: DbManagerProvider,
              public dialogs: Dialogs) {

    this.autoLogin = false; // 이거도 스토리지에서 관리해아함 storage
    // this.sessionId = navParams.get('sessionId');
    this.DbManager.getData('sessionId').then(data => {
      this.sessionId = data;
      this.httpServiceProvider.setSessionId(this.sessionId);
  
      //홈화면 이동시 다시 데이터 불러오거나 스토리지 써야되지만 지금 없으니 임시로 정책 조회
      this.httpServiceProvider.getTOSInfo().subscribe(data => {
      this.TOSInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 정책동의여부 조회 : '+JSON.stringify(this.TOSInfo));
  
        if(this.TOSInfo != null){
          let tosList: any[] = JSON.parse(JSON.stringify(this.TOSInfo['TOS_LIST']));
          for(let t of tosList){
            if(t.TYPE == 'O2P04'){
              this.location_tos_no = t.TOS_NO;
              this.tosLocationDetalUrl = t.TOS_URL;
              if(t.AGREE_YN == 'Y'){
                this.isLocation = true;
              }else{
                this.isLocation = false;
              }
            }
            if(t.TYPE == 'O2P05'){
              this.marketing_tos_no = t.TOS_NO;
              this.tosMarketingDetalUrl = t.TOS_URL;
              if(t.AGREE_YN == 'Y'){
                this.isMarketing = true;
              }else{
                this.isMarketing = false;
              }
            }
            if(t.TYPE == 'O2P06'){
              this.push_tos_no = t.TOS_NO;
              this.tosPushDetalUrl = t.TOS_URL;
              if(t.AGREE_YN == 'Y'){
                this.isPush = true;
              }else{
                this.isPush = false;
              }
            }
          }
        }
      });
    });
  }

  // async getAppName(){
  //   const appName = await this.appVersion.getAppName();
  //   console.log(appName);
  //   this.dialogs.alert(appName);
  // }

  // async getPackageName() {
  //   const packageName = await this.appVersion.getPackageName();
  //   console.log(packageName);
  //   this.dialogs.alert(packageName);
  // }

  // async getVersionNumber() {
  //   const versionNumber = await this.appVersion.getVersionNumber();
  //   console.log(versionNumber);
  //   this.dialogs.alert(versionNumber);
  // }

  // async getVersionCode() {
  //   const versionCode = await this.appVersion.getVersionCode();
  //   console.log(versionCode);
  //   this.dialogs.alert(versionCode.toString());
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){

      // this.getAppName();
      // this.getPackageName();
      // this.getVersionCode();
      // this.getVersionNumber();
      this.deviceManagerProvider.getAppVersion().then(val => {
        this.appVersion = val;
      });    
    }else{
      this.appVersion = '실제 기기에서만 확인가능';
    }

    this.DbManager.getData('autoLogin').then(data => {
      if(data == 'Y'){
        this.autoLogin = true;
      }
    });

  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }

  radioCheck(type,val){
    if(type == '1'){
      if(val == 'Y'){
        this.isPush = true;
      }else{
        this.isPush = false;
      }

      this.httpServiceProvider.setPushUse(val)
      .subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('PushUse : '+JSON.stringify(data));

        if(data['RES_CODE'] == '0'){
          console.log("성공");
        }
      });

    }else if(type == '2'){
      if(val == 'Y'){
        this.isMarketing = true;
      }else{
        this.isMarketing = false;
      }

      let tosList = [];
      tosList.push({"TOS_NO":this.marketing_tos_no.toString(),"AGREE_YN":val});
      
      this.httpServiceProvider.setTOSAgreement(tosList)
      .subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('setTOSAgreement : '+JSON.stringify(data));

        if(data['RES_CODE'] == '0'){
          console.log("성공");
        }
      });
    }else if(type == '3'){
      if(val == 'Y'){
        this.isLocation = true;
      }else{
        this.isLocation = false;
      }
      console.log(this.location_tos_no);
      let tosList = [];
      tosList.push({"TOS_NO":this.location_tos_no.toString(),"AGREE_YN":val});
      
      this.httpServiceProvider.setTOSAgreement(tosList)
      .subscribe(data => {
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');
        console.log('=========================================================');

        console.log('setTOSAgreement : '+JSON.stringify(data));

        if(data['RES_CODE'] == '0'){
          console.log("성공");
        }
      });
    }
  }

  TOSDetailInfo(type){
    let url = '';
    let title = '';

    if(type == '1'){
      url = this.tosPushDetalUrl;
      title = 'PUSH 알림';
    }else if(type == '2'){
      url = this.tosMarketingDetalUrl;
      title = '마케팅 활용동의';
    }else if(type == '3'){
      url = this.tosLocationDetalUrl;
      title = '위치정보 수집이용 동의';
    }
    this.navCtrl.push(TosDetailPage,{'url':'http://110.45.199.181'+url,'sessionId':this.sessionId, 'title':title});
  }

  goSafePasswordPage(){
    this.navCtrl.push(SafePasswordPage);
  }
  goCustomerDetailPage(){
    this.navCtrl.push(CustomerDetailPage);
  }

  goServiceOutPage(){
    this.navCtrl.push(ServiceOutPage);
  }

  checkToggle(){
    console.log(this.autoLogin);
    if(this.autoLogin){
      //자동로그인 정보저장
      this.DbManager.setData('autoLogin','Y').then(data => {
        console.log(data)
      });
    }else{
      //자동로그인 정보삭제
      this.DbManager.setData('autoLogin','N').then(data => {
        console.log(data)
      });
    }
  }

  logout(){
    if(!this.platform.is('core') && !this.platform.is('mobileweb')){
      this.dialogs.confirm('로그아웃 하시겠습니까','로그아웃',['확인','취소']).then(idx => {//idx 1이면 ok 2면 cancel
        if(idx == 1){
          this.httpServiceProvider.logout().subscribe(data => {
            if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){
    
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
          });
        }
      });
        
    }else{
      if(confirm('로그아웃 하시겠습니까')){
        this.httpServiceProvider.logout().subscribe(data => {
          if(data['RESULT_CODE'] != null && data['RESULT_CODE'] == '0'){

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
        });
      }
    }
  }

}
