import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { Material } from '../../models/Material';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
/**
 * Generated class for the MaterialListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material-list',
  templateUrl: 'material-list.html',
})
export class MaterialListPage {
materialList: Observable<Material[]>;
materialtype:string;
groupedMaterials= [];
    
  constructor( public navCtrl: NavController,
    public navParams: NavParams,public inventoryProvider: InventoryProvider) {
    switch(navParams.get('source')){
       case '3':
       this.materialtype='Internal Material';
       break;
case '4':
this.materialtype='Shutter Material';
break;
case '5':
   this.materialtype='Glass_Mirror'; 
break;   
    }
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialListPage');
  }
async ionViewWillEnter(){
     this.materialList = await this.inventoryProvider
        .getmaterialList(this.materialtype)
        .valueChanges();
        this.groupedMaterials= [];
  this.groupMaterial();   
    }

addMaterial(){
    this.navCtrl.push('MaterialPage',{source:this.materialtype});
}
  groupMaterial(){
         var materialnm;   
        let currentGroup = null;
        let currentMaterials = [];
        this.materialList.forEach((value) => {
             
          value.forEach((val)=>{
            materialnm=val.productname;

            if(materialnm != currentGroup){
                currentGroup = val.productname;
                let newGroup = {
                    groupname: currentGroup,
                    materials: []
                };
                currentMaterials = newGroup.materials;
                this.groupedMaterials.push(newGroup);
            }  
            currentMaterials.push(val);
       })
        });
    }
del(id:string){
    this.inventoryProvider.removeMaterialFromMaterialList(id);
    
}  
viewMaterial(id:string){
    console.log('id=',id);
       this.navCtrl.push('MaterialPage',{source:this.materialtype,uid:id});
        }  
}
