import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessoryMasterPage } from './accessory-master';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AccessoryMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessoryMasterPage),
    PipesModule
  ],
})
export class AccessoryMasterPageModule {}
