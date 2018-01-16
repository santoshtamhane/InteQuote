import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialListPage } from './material-list';

@NgModule({
  declarations: [
    MaterialListPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialListPage),

  ],
})
export class MaterialListPageModule {}
