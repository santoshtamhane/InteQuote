import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuoteListPage } from './quote-list';

@NgModule({
  declarations: [
    QuoteListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuoteListPage),
  ],
})
export class QuoteListPageModule {}
