import { Component,OnInit } from '@angular/core';
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
import {Accessory} from '../../models/Accessory';
import { Observable } from 'rxjs';

/**
 * Generated class for the AccessoryMasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accessory-master',
  templateUrl: 'accessory-master.html',
})
export class AccessoryMasterPage implements OnInit{
showCategorytext:boolean;
AccessoryForm:FormGroup;
Categories: Observable<Accessory[]>;
id:string;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider,
    formBuilder: FormBuilder) {
        
this.Categories = this.inventoryProvider
        .getAccessoriesList()
        .valueChanges();
          this.id=this.navParams.get('uid');
            this.showCategorytext=true;
        this.AccessoryForm = formBuilder.group({
      Category: ['', Validators.compose([Validators.required])],
      productname:['', Validators.compose([Validators.required])],
      vendor:['', Validators.compose([Validators.required])],
      status: [true],
      rate: [,Validators.compose([Validators.required,Validators.pattern('^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$')])]
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccessoryMasterPage');

  }
  
  ngOnInit(){
      if(this.id){ 
this.inventoryProvider.getAccessoryInfo(this.id)
.then(accessoryinfo=>{
      this.AccessoryForm.get('rate').setValue(accessoryinfo.rate);
      this.AccessoryForm.get('status').setValue(accessoryinfo.status);
        this.AccessoryForm.get('productname').setValue(accessoryinfo.productname);
        this.AccessoryForm.get('vendor').setValue(accessoryinfo.vendor);
        this.AccessoryForm.get('Category').setValue(accessoryinfo.Category); 
      });
    
      } 
  }
createCategory(choice:number){
      switch(choice) {
    case 1:
        this.showCategorytext=false;
       // this.showProducttext=false;
        break;
    case 2:
           this.showCategorytext=true;
        break;
    case 3:
          // this.showProducttext=false;
        break;
    case 4:
        //   this.showProducttext=true;
        break;
        
  }
  }
  async saveAccessory(): Promise<any> {
    if (!this.AccessoryForm.valid) {
      console.log('Form not ready');
    } else {
      let loading: Loading;
      loading = this.loadingCtrl.create();
      loading.present();

      const Category: string = this.AccessoryForm.value.Category;
      const productname: string = this.AccessoryForm.value.productname;
      const vendor: string = this.AccessoryForm.value.vendor;
      const rate: number = parseFloat(this.AccessoryForm.value.rate);
      
      try {
          if (this.id){
            await this.inventoryProvider.updateAccessory(
            this.id,
          Category,
          productname,
          vendor,
          rate,
          )  
          }
          else{
        await this.inventoryProvider.createAccessory(
          Category,
          productname,
          vendor,
          rate,
        );
          }
        await loading.dismiss();
        this.navCtrl.pop();
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
