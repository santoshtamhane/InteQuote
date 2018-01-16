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
import {Appliance} from '../../models/Appliance';
import { Observable } from 'rxjs';

/**
 * Generated class for the ApplianceMasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appliance-master',
  templateUrl: 'appliance-master.html',
})
export class ApplianceMasterPage implements OnInit {
showCategorytext:boolean;
showTypetext:boolean;
ApplianceForm:FormGroup;
Categories: Observable<Appliance[]>;
prodtypes:Observable<Appliance[]>;
id:string;
catname:string;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public inventoryProvider: InventoryProvider,
    formBuilder: FormBuilder) {
        
this.prodtypes = this.inventoryProvider
        .getAppliancesList()
        .valueChanges();
   this.id=this.navParams.get('uid');
        
            this.showCategorytext=true;
            this.showTypetext=true;
        this.ApplianceForm = formBuilder.group({
            producttype:['',Validators.required],
      Category: ['', Validators.compose([Validators.required])],
      productname:['', Validators.compose([Validators.required])],
      vendor:['', Validators.compose([Validators.required])],
      status: [true],
      rate: [,Validators.compose([Validators.required,Validators.pattern('^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$')])]
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplianceMasterPage');

  }
  ngOnInit(){
      if(this.id){ 
this.inventoryProvider.getApplianceInfo(this.id)
.then(applianceinfo=>{
      this.ApplianceForm.get('rate').setValue(applianceinfo.rate);
      this.ApplianceForm.get('status').setValue(applianceinfo.status);
        this.ApplianceForm.get('productname').setValue(applianceinfo.productname);
          this.ApplianceForm.get('producttype').setValue(applianceinfo.producttype);
            this.ApplianceForm.get('vendor').setValue(applianceinfo.vendor);
      this.catname=applianceinfo.Category;
      return this.inventoryProvider.getappCategoryList(applianceinfo.producttype).valueChanges();
      }).then(res=>{ 
          this.Categories=res; // setting the dynamic drp-down list
          this.ApplianceForm.get('Category').setValue(this.catname); // setting option value in ion-select
      });
      }
    
      
  }
  comparecatFn(a1: any, a2: any): boolean {
      console.log('a1=',a1,'a2=',a2);
     return a1 && a2 ? a1 === a2 : a1 === a2;
 }
 
  setAppliancesCategories(type:string){
     this.Categories = this.inventoryProvider
        .getappCategoryList(type)
        .valueChanges(); 
  }
createCategory(choice:number){
      switch(choice) {
    case 1:
        this.showCategorytext=false;
       this.showTypetext=false;
        break;
    case 2:
           this.showCategorytext=true;
        break;
    case 3:
         this.showTypetext=false;
        break;
    case 4:
          this.showTypetext=true;
        break;
        
  }
  }
  async saveAppliance(): Promise<any> {
    if (!this.ApplianceForm.valid) {
      console.log('Form not ready');
    } else {
      let loading: Loading;
      loading = this.loadingCtrl.create();
      loading.present();

      const producttype:string=this.ApplianceForm.value.producttype;
      const Category: string = this.ApplianceForm.value.Category;
      const productname: string = this.ApplianceForm.value.productname;
      const vendor: string = this.ApplianceForm.value.vendor;
      const rate: number = parseFloat(this.ApplianceForm.value.rate);
      
      try {
          if (this.id){
            await this.inventoryProvider.updateAppliance(
            this.id,
          producttype,
          Category,
          productname,
          vendor,
          rate
          )  
          }
          else{
        await this.inventoryProvider.createAppliance(
        producttype,
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
