import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StampPage } from './stamp';

@NgModule({
  declarations: [
    StampPage,
  ],
  imports: [
    IonicPageModule.forChild(StampPage),
  ],
})
export class StampPageModule {}
