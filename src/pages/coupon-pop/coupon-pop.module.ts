import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponPopPage } from './coupon-pop';

@NgModule({
  declarations: [
    CouponPopPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponPopPage),
  ],
})
export class CouponPopPageModule {}
