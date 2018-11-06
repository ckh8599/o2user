import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServiceListPage } from '../pages/service-list/service-list';
import { MyZonePage } from '../pages/my-zone/my-zone';
import { MyZoneListPage } from '../pages/my-zone-list/my-zone-list';
import { FindShopPage } from '../pages/find-shop/find-shop';
import { EventPage } from '../pages/event/event';
import { QaPage } from '../pages/qa/qa';
import { InformationPage } from '../pages/information/information';
import { CouponPage } from '../pages/coupon/coupon';
import { ConfigPage } from '../pages/config/config';
import { FabPage } from '../pages/fab/fab';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServiceListPage,
    MyZonePage,
    MyZoneListPage,
    FindShopPage,
    EventPage,
    QaPage,
    InformationPage,
    CouponPage,
    ConfigPage,
    FabPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServiceListPage,
    MyZonePage,
    MyZoneListPage,
    FindShopPage,
    EventPage,
    QaPage,
    InformationPage,
    CouponPage,
    ConfigPage,
    FabPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
