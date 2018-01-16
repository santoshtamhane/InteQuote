import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplianceMasterPage } from './appliance-master';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    ApplianceMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplianceMasterPage),
    PipesModule
  ],
})
export class ApplianceMasterPageModule {}
