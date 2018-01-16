import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import {Accessory} from '../../models/Accessory';
import { Observable } from 'rxjs';

/**
 * Generated class for the AccessoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accessories',
  templateUrl: 'accessories.html',
})
export class AccessoriesPage {
accList: Observable<Accessory[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider) {

  this.accList = this.inventoryProvider
        .getAccessoriesList()
        .valueChanges();
        
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccessoriesPage');
  }
addAccessory(){
    this.navCtrl.push('AccessoryMasterPage');
}

viewAccessory(id:string){
    this.navCtrl.push('AccessoryMasterPage',{uid:id});
    
}
del(id:string){
    this.inventoryProvider.removeAccesoriesFromAccessoriesList(id); 
} 

}
