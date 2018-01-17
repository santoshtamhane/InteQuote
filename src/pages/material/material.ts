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
import { Product } from '../../models/Product';
//import { Material } from '../../models/Material';
//import { Room } from '../../models/room';
import { Observable } from 'rxjs';

/**
 * Generated class for the MaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material',
  templateUrl: 'material.html',
})
export class MaterialPage implements OnInit{
addMaterialForm:FormGroup;
 productList: Observable<Product[]>;
  roomproductList: Observable<Product[]>;
 materialtype:string;
 id:string;
 pname:string;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider,
    formBuilder: FormBuilder) {
        this.materialtype=navParams.get('source');
        this.productList = this.inventoryProvider
        .getproductList()
        .valueChanges();
       
           this.id=this.navParams.get('uid');
        this.addMaterialForm = formBuilder.group({
      productname: ['', Validators.compose([Validators.required])],
      roomname:['', Validators.compose([Validators.required])],
      materialname:['', Validators.compose([Validators.required])],
      materialtype:[this.materialtype],
      status: [true],
      psqft: [,Validators.compose([Validators.required,Validators.pattern('^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$')])]
    }); 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
  
    ngOnInit(){
      if(this.id){ 
this.inventoryProvider.getMaterialInfo(this.id)
.then(materialinfo=>{
      this.addMaterialForm.get('roomname').setValue(materialinfo.roomname);
      this.addMaterialForm.get('status').setValue(materialinfo.status);
        this.addMaterialForm.get('materialname').setValue(materialinfo.materialname);
          this.addMaterialForm.get('materialtype').setValue(materialinfo.materialtype);
      this.addMaterialForm.get('psqft').setValue(materialinfo.psqft);
      this.pname=materialinfo.productname;
      return this.inventoryProvider.getroomproductList(materialinfo.roomname).valueChanges();
      }).then(res=>{ 
          this.roomproductList=res; // setting the dynamic drp-down list
          this.addMaterialForm.get('productname').setValue(this.pname); // setting option value in ion-select
      });
      }
    
      
  }
 
   compareroomFn(a1,a2): boolean {
     if (typeof a1 === 'string' || a1 instanceof String){
        return a1 && a2 ? a1 === a2.roomname : a1 === a2;
     } else{
         return a1 && a2 ? a1.roomname === a2.roomname : a1 === a2; 
     }
 }
 
 // https://github.com/ionic-team/ionic/blob/master/src/components/select/select.ts
   compareroomprodFn(e1,e2): boolean {
     if (typeof e1 === 'string' || e1 instanceof String){
        return e1 && e2 ? e1 === e2.productname : e1 === e2;
     } else{
         return e1 && e2 ? e1.productname === e2.productname : e1 === e2; 
     }
 }
 
setProductList(roomsobj:any){
var category=roomsobj.roomname;
      this.roomproductList = this.inventoryProvider
        .getroomproductList(category)
        .valueChanges();
}

async saveMaterial(): Promise<any> {
    if (!this.addMaterialForm.valid) {
      console.log('Form not ready');
    } else {
      let loading: Loading;
      loading = this.loadingCtrl.create();
      loading.present();
const roomname: string =(typeof (this.addMaterialForm.value.roomname) === 'string' || this.addMaterialForm.value.roomname instanceof String)?
 this.addMaterialForm.value.roomname:
 this.addMaterialForm.value.roomname.roomname;
const productname: string = (typeof (this.addMaterialForm.value.productname) === 'string' || this.addMaterialForm.value.productname instanceof String)?
      this.addMaterialForm.value.productname:
 this.addMaterialForm.value.productname.productname
 
      const materialname: string = this.addMaterialForm.value.materialname;
      const psqft: number = parseFloat(this.addMaterialForm.value.psqft);
      
      try {
          if (this.id){
            await this.inventoryProvider.updateMaterial(
            this.id,
          roomname,
          productname,
          materialname,
          this.materialtype,
          psqft
          )  
          }
          else{
        await this.inventoryProvider.createMaterial(
          roomname,
          productname,
          materialname,
          this.materialtype,
          psqft
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
