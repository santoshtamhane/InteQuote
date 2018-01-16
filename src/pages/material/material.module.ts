import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialPage } from './material';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    MaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialPage),
    PipesModule
  ],
})
export class MaterialPageModule {}
