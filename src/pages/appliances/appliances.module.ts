import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppliancesPage } from './appliances';

@NgModule({
  declarations: [
    AppliancesPage,
  ],
  imports: [
    IonicPageModule.forChild(AppliancesPage),
  ],
})
export class AppliancesPageModule {}
