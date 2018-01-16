import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostingListPage } from './costing-list';

@NgModule({
  declarations: [
    CostingListPage,
  ],
  imports: [
    IonicPageModule.forChild(CostingListPage),
  ],
})
export class CostingListPageModule {}
