import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

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
import { CertificationConfirmPage } from '../pages/certification-confirm/certification-confirm';
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
import { TosDetailPage } from '../pages/tos-detail/tos-detail';
import { SafePasswordPage } from '../pages/safe-password/safe-password';
import { SafePasswordRegPage } from '../pages/safe-password-reg/safe-password-reg';
import { CustomerDetailPage } from '../pages/customer-detail/customer-detail';
import { ChangePwPage } from '../pages/change-pw/change-pw';
import { ChangeIdPage } from '../pages/change-id/change-id';
import { ServiceOutPage } from '../pages/service-out/service-out';
import { DbManagerProvider } from '../providers/db-manager/db-manager';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import{ Brightness} from '@ionic-native/brightness';
import { DeviceManagerProvider } from '../providers/device-manager/device_manager';
import { FindIdDetailPage } from '../pages/find-id-detail/find-id-detail';
import { FindPwDetailPage } from '../pages/find-pw-detail/find-pw-detail';
import { TempPwResetPage } from '../pages/temp-pw-reset/temp-pw-reset';
import { PipesModule } from '../pipes/pipes.module';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CouponPopPage } from '../pages/coupon-pop/coupon-pop';

import { Geolocation } from '@ionic-native/geolocation';

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
    CertificationConfirmPage,
    FindIdPage,
    FindPwPage,
    LoginPage,
    RegisterPage,
    PolicyPage,
    ShopDetailMapPage,
    ThemaZoneDetailPage,
    TosDetailPage,
    SafePasswordPage,
    SafePasswordRegPage,
    CustomerDetailPage,
    ChangePwPage,
    ChangeIdPage,
    ServiceOutPage,
    FindIdDetailPage,
    FindPwDetailPage,
    TempPwResetPage,
    CouponPopPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxBarcodeModule,
    IonicSwipeAllModule,
    FlipModule,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
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
    CertificationConfirmPage,
    FindIdPage,
    FindPwPage,
    LoginPage,
    RegisterPage,
    PolicyPage,
    ShopDetailMapPage,
    ThemaZoneDetailPage,
    TosDetailPage,
    SafePasswordPage,
    SafePasswordRegPage,
    CustomerDetailPage,
    ChangePwPage,
    ChangeIdPage,
    ServiceOutPage,
    FindIdDetailPage,
    FindPwDetailPage,
    TempPwResetPage,
    CouponPopPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    CallNumber,
    InAppBrowser,
    Dialogs,
    AppVersion,
    DbManagerProvider,
    BarcodeScanner,
    Brightness,
    UniqueDeviceID,
    Uid,
    AndroidPermissions,
    DeviceManagerProvider,
    Device,
    Diagnostic,
    Geolocation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
