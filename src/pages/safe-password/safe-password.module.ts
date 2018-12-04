import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafePasswordPage } from './safe-password';

@NgModule({
  declarations: [
    SafePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(SafePasswordPage),
  ],
})
export class SafePasswordPageModule {}
