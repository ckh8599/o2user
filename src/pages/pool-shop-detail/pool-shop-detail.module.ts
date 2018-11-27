import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoolShopDetailPage } from './pool-shop-detail';

@NgModule({
  declarations: [
    PoolShopDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PoolShopDetailPage),
  ],
})
export class PoolShopDetailPageModule {}
