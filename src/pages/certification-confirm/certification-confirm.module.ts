import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificationConfirmPage } from './certification-confirm';

@NgModule({
  declarations: [
    CertificationConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificationConfirmPage),
  ],
})
export class CertificationConfirmPageModule {}
