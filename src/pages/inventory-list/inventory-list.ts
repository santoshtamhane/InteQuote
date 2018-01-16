import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

/**
 * Generated class for the InventoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-list',
  templateUrl: 'inventory-list.html',
})
export class InventoryListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryListPage');
  }
itemSelected(choice:number){
    switch(choice) {
    case 1:
        this.navCtrl.push('RoomPage');
        break;
    case 2:
           this.navCtrl.push('ProductListPage'); 
        break;
    case 3:
    let params3={
    source:'3'};// internal material
            this.navCtrl.push('MaterialListPage',params3); 
        break;
    case 4:
           let params4={
    source:'4'}; //shutter material
            this.navCtrl.push('MaterialListPage',params4); 
        break;
        case 6:
        this.navCtrl.push('AppliancesPage');
        break;
    case 7:
        this.navCtrl.push('AccessoriesPage');
        break;
  }
}
}
