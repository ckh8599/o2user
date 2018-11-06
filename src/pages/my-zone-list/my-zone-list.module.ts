import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyZoneListPage } from './my-zone-list';

@NgModule({
  declarations: [
    MyZoneListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyZoneListPage),
  ],
})
export class MyZoneListPageModule {}
