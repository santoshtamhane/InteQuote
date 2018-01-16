import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { Room } from '../../models/room';
import { Observable } from 'rxjs';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
 roomList: Observable<Room[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider) {

  this.roomList = this.inventoryProvider
        .getroomList()
        .valueChanges();
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
    
  }
  
  addRoom(){
  let prompt = this.alertCtrl.create({
    title: 'Add Room',
    message: "Enter the type of Room/Area",
    inputs: [
      {
        name: 'RoomType',
        placeholder: 'Bedroom, Bathroom_1 etc.'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
         
      this.inventoryProvider.createRoom(data.RoomType);


           
      }
      }
    ]
  });
  prompt.present();
  }
}
