import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { Product } from '../../models/Product';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
 productList: Observable<Product[]>;
    groupedProducts=[];
  constructor( public navCtrl: NavController,
    public navParams: NavParams,public inventoryProvider: InventoryProvider) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }
ionViewWillEnter(){
    this.productList = this.inventoryProvider
        .getproductList()
        .valueChanges();
       this.groupProducts(); 
    }
    
    

addProduct(){
    this.navCtrl.push('ProductPage');
}

     groupProducts(){
         var prodnm;   
        let currentGroup = null;
        let currentProducts = [];
        this.groupedProducts.splice(0);
        this.productList.forEach((value) => {
          value.forEach((val)=>{
            prodnm=val.roomname;
            if(prodnm != currentGroup){
                currentGroup = val.roomname;
                let newGroup = {
                    groupname: currentGroup,
                    products: []
                };
                currentProducts = newGroup.products;
           
                this.groupedProducts.push(newGroup);
            }  
            currentProducts.push(val);
       }) 
        });
     
    }
del(pid:string){
    console.log(pid);
    this.inventoryProvider.removeProductFromProductList(pid);
    
}    
    viewProduct(id:string){
    console.log('viewid=',id);
        this.navCtrl.push('ProductPage',{uid:id})
        }
}
