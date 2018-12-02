import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NgxBarcodeModule } from 'ngx-barcode';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServiceListPage } from '../pages/service-list/service-list';
import { ServiceListDataPage } from '../pages/service-list-data/service-list-data';
import { MyZonePage } from '../pages/my-zone/my-zone';
import { MyZoneListPage } from '../pages/my-zone-list/my-zone-list';
import { FindShopPage } from '../pages/find-shop/find-shop';
import { EventPage } from '../pages/event/event';
import { QaPage } from '../pages/qa/qa';
import { InformationPage } from '../pages/information/information';
import { CouponPage } from '../pages/coupon/coupon';
import { ConfigPage } from '../pages/config/config';
import { FabPage } from '../pages/fab/fab';

import { CertificationPage } from '../pages/certification/certification';
import { FindIdPage } from '../pages/find-id/find-id';
import { FindPwPage } from '../pages/find-pw/find-pw';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PolicyPage } from '../pages/policy/policy';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { FlipModule } from 'ngx-flip';

import { HttpClientModule } from '@angular/common/http';
import { ShopInfoPage } from '../pages/shop-info/shop-info';
import { BarcodePage } from '../pages/barcode/barcode';

import { CallNumber } from '@ionic-native/call-number';
import { Dialogs } from '@ionic-native/dialogs';

import { PoolShopDetailPage } from '../pages/pool-shop-detail/pool-shop-detail'
import { ShopDetailMapPage } from '../pages/shop-detail-map/shop-detail-map';
import { ThemaZoneDetailPage } from '../pages/thema-zone-detail/thema-zone-detail';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServiceListPage,
    ServiceListDataPage,
    MyZonePage,
    MyZoneListPage,
    FindShopPage,
    EventPage,
    QaPage,
    InformationPage,
    CouponPage,
    ConfigPage,
    FabPage,
    ShopInfoPage,
    BarcodePage,
    PoolShopDetailPage,
    CertificationPage,
    FindIdPage,
    FindPwPage,
    LoginPage,
    RegisterPage,
    PolicyPage,
    ShopDetailMapPage,
    ThemaZoneDetailPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxBarcodeModule,
    IonicSwipeAllModule,
    FlipModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServiceListPage,
    ServiceListDataPage,
    MyZonePage,
    MyZoneListPage,
    FindShopPage,
    EventPage,
    QaPage,
    InformationPage,
    CouponPage,
    ConfigPage,
    FabPage,
    ShopInfoPage,
    BarcodePage,
    PoolShopDetailPage,
    CertificationPage,
    FindIdPage,
    FindPwPage,
    LoginPage,
    RegisterPage,
    PolicyPage,
    ShopDetailMapPage,
    ThemaZoneDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    CallNumber,
    InAppBrowser,
    Dialogs
  ]
})
export class AppModule {}
