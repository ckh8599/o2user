import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TosDetailPage } from './tos-detail';

@NgModule({
  declarations: [
    TosDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TosDetailPage),
  ],
})
export class TosDetailPageModule {}
