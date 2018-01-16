import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import {Appliance} from '../../models/Appliance';
import { Observable } from 'rxjs';
/**
 * Generated class for the AppliancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appliances',
  templateUrl: 'appliances.html',
})
export class AppliancesPage {
appList: Observable<Appliance[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider) {

  this.appList = this.inventoryProvider
        .getAppliancesList()
        .valueChanges();
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppliancesPage');
  }
addAppliance(){
    this.navCtrl.push('ApplianceMasterPage');
}
viewAppliance(id:string){
    this.navCtrl.push('ApplianceMasterPage',{uid:id});
    
}
del(id:string){
    this.inventoryProvider.removeApplianceFromApplianceList(id); 
}  

}
