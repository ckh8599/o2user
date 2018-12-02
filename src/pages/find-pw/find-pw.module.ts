import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPwPage } from './find-pw';

@NgModule({
  declarations: [
    FindPwPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPwPage),
  ],
})
export class FindPwPageModule {}
