import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPwDetailPage } from './find-pw-detail';

@NgModule({
  declarations: [
    FindPwDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPwDetailPage),
  ],
})
export class FindPwDetailPageModule {}
