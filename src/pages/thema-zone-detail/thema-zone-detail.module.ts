import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThemaZoneDetailPage } from './thema-zone-detail';

@NgModule({
  declarations: [
    ThemaZoneDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ThemaZoneDetailPage),
  ],
})
export class ThemaZoneDetailPageModule {}
