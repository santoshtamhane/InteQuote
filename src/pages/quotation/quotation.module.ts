import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotationPage } from './quotation';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    QuotationPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotationPage),
    PipesModule
  ],
})
export class QuotationPageModule {}
