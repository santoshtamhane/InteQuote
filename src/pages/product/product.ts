import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { Product } from '../../models/Product';
import { Room } from '../../models/room';
import { Observable } from 'rxjs';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
addProductForm:FormGroup;
 roomList: Observable<Room[]>;
public docid:string;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider,
    formBuilder: FormBuilder) {
        
this.roomList = this.inventoryProvider
        .getroomList()
        .valueChanges();
       this.docid=this.navParams.get('uid');
        this.addProductForm = formBuilder.group({
      productname: ['', Validators.compose([Validators.required])],
      roomname:['', Validators.compose([Validators.required])],
      status: [true],
      cost: ['']
    }); 
console.log('id=',this.docid);    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
  ngOnInit(){
      if(this.docid){
  this.inventoryProvider.getProductInfo(this.docid).then(prodinfo=>{
      this.addProductForm.get('productname').setValue(prodinfo.productname);
      this.addProductForm.get('status').setValue(prodinfo.status);
      this.addProductForm.get('cost').setValue(prodinfo.cost);
      this.addProductForm.get('roomname').setValue(prodinfo.roomname);
      })
      }
  }
  compareFn(e1,e2): boolean {
     if (typeof e1 === 'string' || e1 instanceof String){
        return e1 && e2 ? e1 === e2.roomname : e1 === e2;
     } else{
         return e1 && e2 ? e1.roomname === e2.roomname : e1 === e2; 
     }
 }
 
async saveProduct(): Promise<any> {
    if (!this.addProductForm.valid) {
      console.log('Form not ready');
    } else {
      let loading: Loading;
      loading = this.loadingCtrl.create();
     loading.onDidDismiss(() => this.navCtrl.pop());
      loading.present();

      const room: string = (typeof this.addProductForm.value.roomname === 'string' || this.addProductForm.value.roomname instanceof String)?this.addProductForm.value.roomname:this.addProductForm.value.roomname.roomname;
      const productname: string = this.addProductForm.value.productname;
      const cost: number = parseFloat(this.addProductForm.value.cost?this.addProductForm.value.cost:0);

      try {
          if (this.docid){
            await this.inventoryProvider.updateProduct(
            this.docid,
          room.trim(),
          productname.trim(),
          cost
          )  
          }
          else{
        await this.inventoryProvider.createProduct(
          room.trim(),
          productname.trim(),
          cost
          )};
        await loading.dismiss();
        
       
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    }
  }
  
}
