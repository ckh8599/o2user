import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { ServiceListPage } from '../pages/service-list/service-list';
import { HomePage } from '../pages/home/home';
import { MyZonePage } from '../pages/my-zone/my-zone';
import { MyZoneListPage } from '../pages/my-zone-list/my-zone-list';
import { FindShopPage } from '../pages/find-shop/find-shop';
import { EventPage } from '../pages/event/event';
import { QaPage } from '../pages/qa/qa';
import { InformationPage } from '../pages/information/information';
import { CouponPage } from '../pages/coupon/coupon';
import { ConfigPage } from '../pages/config/config';

import { CertificationPage } from '../pages/certification/certification';
import { FindIdPage } from '../pages/find-id/find-id';
import { FindPwPage } from '../pages/find-pw/find-pw';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PolicyPage } from '../pages/policy/policy';

import { HttpServiceProvider } from '../providers/http-service/http-service';

import 'rxjs/add/operator/map';
import { ShopInfoPage } from '../pages/shop-info/shop-info';

import { NgxBarcodeModule } from 'ngx-barcode';

import { BarcodePage } from '../pages/barcode/barcode';

import { Dialogs } from '@ionic-native/dialogs';
import { PoolShopDetailPage } from '../pages/pool-shop-detail/pool-shop-detail';
import { DbManagerProvider } from '../providers/db-manager/db-manager';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RegisterPage;
  sessionId: string;

  deviceCheckData: any;
  loginInfo: any;
  customerInfo: any;
  customerMainInfo: any;
  brandInfo: any;
  barcodeInfo: any;
  mainShopListInfo: any;
  TOSInfo: any;
  poolList: PoolList[];

  barcode: any;

  //고객정보
  customer_nm: string;
  //보유포인트정보
  avail_point: string;
  avail_cash: string;
  avail_stamp: string;

  tos_push_yn = 'N';
  tos_marketing_yn = 'N';
  tos_location_yn = 'N';
  mdn: string;
  out_pw: string;

  dbData: any;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public DbManager: DbManagerProvider, 
              public modalCtrl: ModalController, 
              public httpServiceProvider: HttpServiceProvider,
              public ngxBarcodeModule: NgxBarcodeModule,
              public dialogs: Dialogs,
              public Alert: AlertController,
              public events: Events
              ) {
    this.initializeApp();
  }

  openBarcodeModal() {    
    let modal = this.modalCtrl.create(BarcodePage, {}, {cssClass: "transactionConfirm-modal"});
    modal.present();     
  }

  getBaseInfo() {
    //고객기본정보조회
    this.httpServiceProvider.getCustomerInfo('http://110.45.199.181/api/customermain/CustomerInfoSearch').subscribe(data => {
      this.customerInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 기본정보 조회 : '+JSON.stringify(this.customerInfo));
      this.customer_nm = this.customerInfo['CUSTOMER_NM'];
    })

    //브랜드 정보조회
    this.httpServiceProvider.getBrandInfo('http://110.45.199.181/api/common/BrandSearch').subscribe(data => {
      this.brandInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('브랜드 정보 조회 : '+JSON.stringify(this.brandInfo));
    })

    //디바이스 체크
    this.httpServiceProvider.deviceAppCheck('http://110.45.199.181/api/customer/DeviceAppCheck').subscribe(data => {
      this.deviceCheckData = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('디바이스 체크 : '+JSON.stringify(this.deviceCheckData));
    })

    //고객 포인트 캐시 정보 조회
    this.httpServiceProvider.getCustomerMainInfo('http://110.45.199.181/api/customermain/CustomerMainSearch').subscribe(data => {
      this.customerMainInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 포인트 캐시 정보 조회 : '+JSON.stringify(this.customerMainInfo));

      this.avail_point = this.customerMainInfo['AVAIL_POINT'];
      this.avail_stamp = this.customerMainInfo['AVAIL_STAMP'];
      this.avail_cash = this.customerMainInfo['AVAIL_CASH'];
      this.poolList = this.customerMainInfo['POOL_LIST'];

      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('풀리스트 정보 : ' + JSON.stringify(this.poolList));
      if(this.poolList != null){

        for(let poolinfo of this.poolList){
          console.log('풀리스트 상세 보유스탬프 : ' + poolinfo.AVAIL_STAMP);
          console.log('풀리스트 상세 보유캐시 : ' + poolinfo.AVAIL_CASH);
          console.log('풀리스트 상세 보유포인트 : ' + poolinfo.AVAIL_POINT);
          console.log('풀리스트 상세 브랜드코드 : ' + poolinfo.BRND_CD);
          console.log('풀리스트 상세 브랜드명 : ' + poolinfo.BRND_NM);
          
        }
      }
    })

    //고객 바코드정보 조회
    this.httpServiceProvider.getBarcodeInfo('http://110.45.199.181/api/customermain/BarcodeSearch').subscribe(data => {
      this.barcodeInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 바코드 정보 조회 : '+JSON.stringify(this.barcodeInfo));

      this.barcode = this.barcodeInfo['BARCODE'];
      if(this.barcodeInfo['RESULT_CODE'] == '0'){
        this.DbManager.setData('save_barcode',this.barcode).then(data => {console.log(data)});
      }
    })

    //가맹점 정보 조회
    this.httpServiceProvider.getMainShopListInfo('http://110.45.199.181/api/shop/MainShopListSearch','01','1','10').subscribe(data => {
      this.mainShopListInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('가맹점 정보 조회 : '+JSON.stringify(this.mainShopListInfo));
    })

    //고객 정책동의여부 조회
    this.httpServiceProvider.getTOSInfo('http://110.45.199.181/api/customer/TOSSearch').subscribe(data => {
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
          if(t.TYPE == 'O2P04' && t.AGREE_YN == 'Y'){
            this.tos_location_yn = 'Y';
          }
          if(t.TYPE == 'O2P05' && t.AGREE_YN == 'Y'){
            this.tos_marketing_yn = 'Y';
          }
          if(t.TYPE == 'O2P06' && t.AGREE_YN == 'Y'){
            this.tos_push_yn = 'Y';
          }
        }
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.DbManager.getData('autoLogin').then(data => {
        console.log(data);
        if(data == 'Y'){
          this.DbManager.getData('save_auth').then(data2 => {
            console.log("자동로그인 데이터? : "+data2.save_out);
            let save_out = data2.save_out == null?'':data2.save_out;
    
            this.httpServiceProvider.LoginByToken('http://110.45.199.181/api/customermain/LoginByToken',save_out).subscribe(data => {
              this.loginInfo = data;
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('=========================================================');
              console.log('로그인 정보 : '+JSON.stringify(this.loginInfo));
              // this.sessionId = this.loginInfo['SESSION_ID'];
    
              if(this.loginInfo['RESULT_CODE'] == '0'){
                this.DbManager.setData('sessionId',this.loginInfo['SESSION_ID']).then(data => {
                    this.events.publish('isLogin',true);
                });
              }else{
                //자동로그인 실패시 처리필요
                if(!this.platform.is('core') && !this.platform.is('mobileweb')){
                  this.dialogs.alert('자동로그인 실패');
                }else{
                  alert('자동로그인 실패');
                }
                
              }
    
    
              
            });
          });
  
        }
      });

      this.events.subscribe('isLogin', res => {
        let isLogin = res;
        if(isLogin){
          this.rootPage = RegisterPage;
          this.DbManager.getData('sessionId').then(data => {
            this.httpServiceProvider.setSessionId(data);
            this.sessionId = data;
  
            this.getBaseInfo();
          });
        }
      });

    });
  }

  openServiceList(param) {this.nav.push(ServiceListPage,{'point_type':param});}
  openMyZone(param) { this.nav.push(MyZonePage);}
  openMyZoneList() { this.nav.push(MyZoneListPage);}
  openFindShop() { this.nav.push(FindShopPage);}
  openEvent() { this.nav.push(EventPage);}
  openQa() { this.nav.push(QaPage);}
  openInformation() { this.nav.push(InformationPage);}
  openCoupon() { this.nav.push(CouponPage);}
  openConfig() { 
    console.log(this.tos_location_yn+ " - "+this.tos_marketing_yn+" - "+this.tos_push_yn);
    console.log(this.sessionId);
    this.nav.push(ConfigPage,{'tos_push_yn':this.tos_push_yn,'tos_location_yn':this.tos_location_yn,'tos_marketing_yn':this.tos_marketing_yn});
  }
  openShopInfo(){this.nav.push(ShopInfoPage);}

  openPoolShopDetailPage(pool_cd, pool_service_type){
    this.nav.push(PoolShopDetailPage,{'pool_cd':pool_cd,'pool_service_type':pool_service_type});
  }

  myO2zone(){
    this.nav.push(MyZonePage);
  }


  /*
  openServiceList(param) { this.modalCtrl.create(ServiceListPage,{'param':param}).present();}
  openMyZone(param) { this.modalCtrl.create(MyZonePage).present();}
  openMyZoneList() { this.modalCtrl.create(MyZoneListPage).present();}
  openFindShop() { this.modalCtrl.create(FindShopPage).present();}
  openEvent() { this.modalCtrl.create(EventPage).present();}
  openQa() { this.modalCtrl.create(QaPage).present();}
  openInformation() { this.modalCtrl.create(InformationPage).present();}
  openCoupon() { this.modalCtrl.create(CouponPage).present();}
  openConfig() { this.modalCtrl.create(ConfigPage).present();}
  */
}

class PoolList{
  AVAIL_STAMP: string;
  BRND_CNT: string;
  AVAIL_CASH: string;
  BRND_IMG_URL: string;
  BRND_CD: string;
  POOL_SERVICE_TYPE: string;
  BRND_NM: string;
  POOL_TYPE: string;
  AVAIL_POINT: string;
  POOL_NM: string;
  POOL_CD: string;
}