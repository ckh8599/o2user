import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDetailMapPage } from './shop-detail-map';

@NgModule({
  declarations: [
    ShopDetailMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopDetailMapPage),
  ],
})
export class ShopDetailMapPageModule {}
