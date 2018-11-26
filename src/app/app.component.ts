import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
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
import { ShopInfoPage } from '../pages/shop-info/shop-info';

import { HttpServiceProvider } from '../providers/http-service/http-service';

import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html',
  providers: [HttpServiceProvider]
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  // sessionId: string;

  deviceCheckData: any;
  loginInfo: any;
  customerInfo: any;
  customerMainInfo: any;
  brandInfo: any;
  barcodeInfo: any;
  mainShopListInfo: any;
  TOSInfo: any;
  poolList: PoolList[];
  json10: any;

  //고객정보
  customer_nm: string;
  //보유포인트정보
  avail_point: string;
  avail_cash: string;
  avail_stamp: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public modalCtrl: ModalController, public httpServiceProvider: HttpServiceProvider) {
    this.initializeApp();
    this.storage.set('sessionId', "");
    //1. 첫번째 htttp 호출
    
    //this.splashScreen.show();
    
    //로그인 시도
    this.getLoginInfo();
    
  }

  getLoginInfo() {
    //로그인 정보 세팅(전화번호, 디바이스코드)
    this.httpServiceProvider.setLoginInfo('01086364686','73C93FDB48C786D53B30E4E49831750B47018734D8482D6F4DAE607773C138C7');
    // this.httpServiceProvider.setUrl('/api/customermain/LoginByMdn');
    this.httpServiceProvider.LoginByMdn('/api/customermain/LoginByMdn').subscribe(data => {
      this.loginInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('로그인 정보 : '+JSON.stringify(this.loginInfo));
      this.storage.set('sessionId',this.loginInfo['SESSION_ID']);

      this.httpServiceProvider.setSessionId(this.loginInfo['SESSION_ID']);

      
      
      //초기정보 모두 조회
      this.getBaseInfo();
    })
  }

  getBaseInfo() {
    //고객기본정보조회
    this.httpServiceProvider.getCustomerInfo('/api/customermain/CustomerInfoSearch').subscribe(data => {
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
    this.httpServiceProvider.getBrandInfo('/api/common/BrandSearch').subscribe(data => {
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
    this.httpServiceProvider.deviceAppCheck('/api/customer/DeviceAppCheck').subscribe(data => {
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
    this.httpServiceProvider.getCustomerMainInfo('/api/customermain/CustomerMainSearch').subscribe(data => {
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
      console.log('풀리스트 정보 : ' + this.poolList.toString());
      for(let poolinfo of this.poolList){
        console.log('풀리스트 상세 보유스탬프 : ' + poolinfo.AVAIL_STAMP);
        console.log('풀리스트 상세 보유캐시 : ' + poolinfo.AVAIL_CASH);
        console.log('풀리스트 상세 보유포인트 : ' + poolinfo.AVAIL_POINT);
        console.log('풀리스트 상세 브랜드코드 : ' + poolinfo.BRND_CD);
        console.log('풀리스트 상세 브랜드명 : ' + poolinfo.BRND_NM);
        
      }
    })

    //고객 바코드정보 조회
    this.httpServiceProvider.getBarcodeInfo('/api/customermain/BarcodeSearch').subscribe(data => {
      this.barcodeInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 바코드 정보 조회 : '+JSON.stringify(this.barcodeInfo));
    })

    //가맹점 정보 조회
    this.httpServiceProvider.getMainShopListInfo('/api/shop/MainShopListSearch').subscribe(data => {
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
    this.httpServiceProvider.getTOSInfo('/api/customer/TOSSearch').subscribe(data => {
      this.TOSInfo = data;
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('=========================================================');
      console.log('고객 정책동의여부 조회 : '+JSON.stringify(this.TOSInfo));
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storage.set('name', 'Max');
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openServiceList(param) { this.nav.setRoot(ServiceListPage,{'param':param});}
  openMyZone(param) { this.nav.setRoot(MyZonePage);}
  openMyZoneList() { this.nav.setRoot(MyZoneListPage);}
  openFindShop() { this.nav.setRoot(FindShopPage);}
  openEvent() { this.nav.setRoot(EventPage);}
  openQa() { this.nav.setRoot(QaPage);}
  openInformation() { this.nav.setRoot(InformationPage);}
  openCoupon() { this.nav.setRoot(CouponPage);}
  openConfig() { this.nav.setRoot(ConfigPage);}

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