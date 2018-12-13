import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafePasswordRegPage } from './safe-password-reg';

@NgModule({
  declarations: [
    SafePasswordRegPage,
  ],
  imports: [
    IonicPageModule.forChild(SafePasswordRegPage),
  ],
})
export class SafePasswordRegPageModule {}
