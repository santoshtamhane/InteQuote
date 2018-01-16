import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
import { QuotationProvider } from '../../providers/quotation/quotation';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import { Quotation } from '../../models/quotation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
quotecoll:Observable<any>;
quotewoncoll:Observable<any>;
countItems=0;
qtotal=0;
qwontotal=0;
woncountItems=0;
  constructor(public navCtrl: NavController,public authProvider: AuthProvider,public quoteprovider:QuotationProvider) {
     
  }
  ngOnInit(){
     this.getNewQuoteInfo('New'); 
this.getWonQuoteInfo('Win');      
  }
getNewQuoteInfo(status:string){
this.quotecoll=this.quoteprovider.getQuoteListbyStatus(status).snapshotChanges()
.map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Quotation;
        const id=a.payload.doc.id;
        return {id,...data};
      });
    });
   this.quotecoll.subscribe(quotedocs => {
 this.qtotal=quotedocs.map(res=>res.grandTotal)
               .reduce((tot,price)=>tot+price,0);
  this.countItems=  quotedocs.length;           
}) 
   }
   
   getWonQuoteInfo(status:string){
this.quotewoncoll=this.quoteprovider.getQuoteListbyStatus(status).snapshotChanges()
.map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Quotation;
        const id=a.payload.doc.id;
        return {id,...data};
      });
    });
    this.quotewoncoll.subscribe(quotedocs => {
 this.qwontotal=quotedocs.map(res=>res.grandTotal)
               .reduce((tot,price)=>tot+price,0);
   this.woncountItems=  quotedocs.length;          
}) 
   }


   HowToGetData(){
       /* https://www.questarter.com/q/how-do-i-retrieve-the-id-of-a-singe-firestore-document-27_47221248.html
       
       this.countryRef = this.afs.collection('Country', ref => ref.where('code', '==', 'za'));

    this.docId = this.countryRef.snapshotChanges().map( changes => {
        return changes.map(a => {
            const data = a.payload.doc.data() as Country;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
    });

this.docId.subscribe(docs => {
  docs.forEach(doc => {
    console.log(doc.id);
  })
})
       */
   }
  launchquotelist(choice)  {
      switch(choice){
          case 1 : 
          this.navCtrl.push('QuoteListPage',{status:'New'});
          break;
          case 2 :
          this.navCtrl.push('QuoteListPage',{status:'Win'});
          break;
          default: this.navCtrl.push('QuoteListPage');
          break;
      }
  }
  
logOut(){
this.authProvider.logoutUser().then(() => {
    this.navCtrl.setRoot('LoginPage');
  });
}
}
