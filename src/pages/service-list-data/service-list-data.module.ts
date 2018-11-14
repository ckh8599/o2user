import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceListDataPage } from './service-list-data';

@NgModule({
  declarations: [
    ServiceListDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceListDataPage),
  ],
})
export class ServiceListDataPageModule {}
