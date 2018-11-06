import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyZonePage } from './my-zone';

@NgModule({
  declarations: [
    MyZonePage,
  ],
  imports: [
    IonicPageModule.forChild(MyZonePage),
  ],
})
export class MyZonePageModule {}
