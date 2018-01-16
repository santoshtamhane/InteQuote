import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { QuotationProvider } from '../../providers/quotation/quotation';
import { PdfServiceProvider } from '../../providers/pdf-service/pdf-service';

import { Quotation } from '../../models/quotation';
import { Observable } from 'rxjs';

/**
 * Generated class for the QuoteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quote-list',
  templateUrl: 'quote-list.html',
})
export class QuoteListPage {
QuoteList: Observable<Quotation[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider,
    public pdfservice:PdfServiceProvider,
    public quoteprovider:QuotationProvider) {

this.QuoteList = this.quoteprovider
        .getQuoteList()
        .valueChanges();
if(this.navParams.get('status')){
  this.QuoteList = this.quoteprovider
        .getQuoteListbyStatus(this.navParams.get('status'))
        .valueChanges();
}
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuoteListPage');
  }
addQuote(){
    this.navCtrl.push('QuotationPage');
}
    async getPDFDownload(id:string){
        var quotedata=await this.inventoryProvider.getQuoteInfo(id);
        var pdf=await this.pdfservice.downloadPdf(quotedata);
        console.log('pdf=',pdf);
}
}
