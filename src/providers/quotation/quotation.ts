import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Room } from '../../models/room';
import { Product } from '../../models/Product';
import { Material } from '../../models/Material';
import {Grocery} from '../../models/Grocery';
import { Quotation } from '../../models/quotation';
import { Accessory } from '../../models/Accessory';
import {Appliance} from '../../models/Appliance';
import {Observable} from 'rxjs';
/*
  Generated class for the QuotationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuotationProvider {
  userId: string;
  public quotedocs:AngularFirestoreCollection<Quotation>;
  public qd:any;
constructor(
    public fireStore: AngularFirestore,
    public afAuth: AngularFireAuth

  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  async getTeamId(): Promise<string> {
    const userProfile: firebase.firestore.DocumentSnapshot = await firebase
      .firestore()
      .doc(`userProfile/${this.userId}`)
      .get();

    return userProfile.data().teamId;
  }
  
     getQuoteListbyStatus(status:string): AngularFirestoreCollection<Quotation> {
    return this.fireStore.collection<Quotation>(
      `/QuoteList`,
      clause => clause.where('qStatus','==',status)
    )
  }
  getQuoteList(): AngularFirestoreCollection<Quotation> {
    return this.fireStore.collection<Quotation>(
      `/QuoteList`,
     // clause => clause.orderBy('timestamp','desc')
    )
  }
  
 /* getQuoteListData(status:string) :Observable<Quotation>{
    return this.getQuoteList(status).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Quotation;
        return {...data};
      });
    })
  }*/
  
}


