import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeFabPage } from './home-fab';

@NgModule({
  declarations: [
    HomeFabPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeFabPage),
  ],
})
export class HomeFabPageModule {}
