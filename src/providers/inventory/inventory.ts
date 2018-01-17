import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Room } from '../../models/room';
import { Product } from '../../models/Product';
import { Material } from '../../models/Material';
import {Grocery} from '../../models/Grocery';
import { Quotation } from '../../models/quotation';
import { Accessory } from '../../models/Accessory';
import {Appliance} from '../../models/Appliance';

@Injectable()
export class InventoryProvider {
  userId: string;

  constructor(
    public fireStore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  async getTeamId(): Promise<string> {
    const userProfile: firebase.firestore.DocumentSnapshot = await firebase
      .firestore()
      .doc(`userProfile/${this.userId}`)
      .get();

    return userProfile.data().teamId;
  }

  getGroceryList(teamId: string): AngularFirestoreCollection<Grocery> {
    return this.fireStore.collection<Grocery>(
      `/teamProfile/${teamId}/groceryList`,
      ref => ref.orderBy('quantity')
    );
  }
  getroomList(): AngularFirestoreCollection<Room> {
    return this.fireStore.collection<Room>(
      `/roomList`,
      ref => ref.where('status','==',true)
      .orderBy('roomname')
    );
  }
    getQuoteList(): AngularFirestoreCollection<Quotation> {
    return this.fireStore.collection<Quotation>(
      `/QuoteList`
    ); 
  }
  
 
 
   getproductList(): AngularFirestoreCollection<Product> {
    return this.fireStore.collection<Product>(
      `/productList`,
      ref => ref.where('status','==',true)
      .orderBy('productname')
    );
  }
getroomproductList(room:string): AngularFirestoreCollection<Product> {
    console.log('room=,',room);
    return this.fireStore.collection<Product>(
      `/productList`,
      ref => ref.where('roomname','==',room.trim())
      .where('status','==',true)
    );
  }
  
  getaccprodList(acc:string): AngularFirestoreCollection<Accessory> {
    return this.fireStore.collection<Accessory>(
      `/accessoriesList`,
      ref => ref.where('Category','==',acc.trim())
      .where('status','==',true)
    );
  }
  getappCategoryList(acc:string): AngularFirestoreCollection<Appliance> {
    return this.fireStore.collection<Appliance>(
      `/applianceList`,
      ref => ref.where('producttype','==',acc.trim())
      .where('status','==',true)
    );
  }
  getappProdList(app:string): AngularFirestoreCollection<Appliance> {
    return this.fireStore.collection<Appliance>(
      `/applianceList`,
      ref => ref.where('Category','==',app.trim())
      .where('status','==',true)
    );
  }
 
  
  getmaterialList(source:string): AngularFirestoreCollection<Material> {
    
    return this.fireStore.collection<Material>(
      `/MaterialList`,
      ref => ref.where('materialtype','==',source.trim())
      .where('status','==',true)
    );
  }
  getProductName(id:string):Promise<void>{
      var prodname;
      const productRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/productList/${id}`).ref;
    prodname = productRef.get()
    .then(querySnapshot=> {
            return querySnapshot.data().productname;
        })
    .catch(function(error) {
        console.log("Error getting product documents: ", error);
    }); 
    return prodname;
  }
  getproductMaterialList(product,source:string): AngularFirestoreCollection<Material> {
    return this.fireStore.collection<Material>(
      `/MaterialList`,
      ref => ref.where('productname','==',product)
      .where('materialtype','==',source.trim())
      .where('status','==',true)
    );
  }
  
    removeMaterialFromMaterialList(
    id: string,
  ): Promise<void> {
    const materialRef = this.fireStore.doc(
      `/MaterialList/${id}/`
    );

    return materialRef.update({
      status: false
    });
  }
  removeProductFromProductList(
    id: string,
  ): Promise<void> {
    const productRef = this.fireStore.doc(
      `/productList/${id}/`
    );
    return productRef.update({
      status: false
    });
  }
   removeApplianceFromApplianceList(
    id: string,
  ): Promise<void> {
    const ApplianceRef = this.fireStore.doc(
      `/applianceList/${id}/`
    );
    return ApplianceRef.update({
      status: false
    });
  }
  removeAccesoriesFromAccessoriesList(
    id: string,
  ): Promise<void> {
    const AccessoryRef = this.fireStore.doc(
      `/accessoriesList/${id}/`
    );
    return AccessoryRef.update({
      status: false
    });
  }
  
  getMaterialPrice(id:string):Promise<number>{
      var matprice;
const materialRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/MaterialList/${id}`).ref;
    matprice=materialRef.get()
    .then(materialDoc => {
    return materialDoc.data().psqft
    })
    .catch(error=> {
        console.log("Error getting material documents: ", error)
    });   
return matprice;    
  }
  
  getProductPrice(id:string):Promise<number>{
      const productRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/productList/${id}`).ref;
  return productRef.get()
    .then(querySnapshot=> {
            return querySnapshot.data().cost;
        })
    .catch(function(error) {
        console.log("Error getting product price document: ", error);
    }); 
        
  }
getAccessoriesList(): AngularFirestoreCollection<Accessory> {
    return this.fireStore.collection<Accessory>(
      `/accessoriesList`,
      ref => ref.where('status','==',true)
      .orderBy('productname')
    );
  }
  
  getAppliancesList(): AngularFirestoreCollection<Appliance> {
    return this.fireStore.collection<Appliance>(
      `/applianceList`,
      ref => ref.where('status','==',true)
      .orderBy('productname')
    );
  }
  
  getProductInfo(id:string):Promise<Product>{
      var productinfo;
      const productRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/productList/${id}`).ref;
    productinfo = productRef.get()
    .then(querySnapshot=> {
          return querySnapshot.data();
        })
    .catch(function(error) {
        console.log("Error getting product document: ", error);
    }); 
    return productinfo;
  }
   getMaterialInfo(id:string):Promise<Material>{
      var materialinfo;
      const materialRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/MaterialList/${id}`).ref;
    materialinfo = materialRef.get()
    .then(querySnapshot=> {
                   return querySnapshot.data();
        })
    .catch(function(error) {
        console.log("Error getting material document: ", error);
    }); 
    return materialinfo;
  }
  getApplianceInfo(id:string):Promise<Appliance>{
      var applianceinfo;
      const applianceRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/applianceList/${id}`).ref;
    applianceinfo = applianceRef.get()
    .then(querySnapshot=> {
                   return querySnapshot.data();
        })
    .catch(function(error) {
        console.log("Error getting appliance document: ", error);
    }); 
    return applianceinfo;
  }
  
  getAccessoryInfo(id:string):Promise<Accessory>{
      var accessoriesinfo;
      const accessoriesRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/accessoriesList/${id}`).ref;
    accessoriesinfo = accessoriesRef.get()
    .then(querySnapshot=> {
                   return querySnapshot.data();
        })
    .catch(function(error) {
        console.log("Error getting accessories document: ", error);
    }); 
    return accessoriesinfo;
  }
    getQuoteInfo(id:string):Promise<Quotation>{
      var quoteinfo;
      const quoteRef: firebase.firestore.DocumentReference = this.fireStore.doc(`/QuoteList/${id}`).ref;
    quoteinfo = quoteRef.get()
    .then(querySnapshot=> {
          return querySnapshot.data();
        })
    .catch(function(error) {
        console.log("Error getting Quotation document: ", error);
    }); 
    return quoteinfo;
  }
  
  getGroceryListForShoppingList(
    teamId: string,
    isInShoppingList: boolean
  ): AngularFirestoreCollection<Grocery> {
    return this.fireStore.collection<Grocery>(
      `/teamProfile/${teamId}/groceryList`,
      ref =>
        ref
          .where('inShoppingList', '==', isInShoppingList)
          .where('picked', '==', false)
    );
  }

  getPickedGroceryListForShoppingList(
    teamId: string,
    isInShoppingList: boolean
  ): AngularFirestoreCollection<Grocery> {
    return this.fireStore.collection<Grocery>(
      `/teamProfile/${teamId}/groceryList`,
      ref =>
        ref
          .where('inShoppingList', '==', isInShoppingList)
          .where('picked', '==', true)
    );
  }

  createRoom(roomname: string): Promise<void> {
    const roomId: string = this.fireStore.createId();
    return this.fireStore
      .doc<Room>(`roomList/${roomId}`)
      .set({
        id: roomId,
        roomname,
       status:true
      });
  }
  createProduct(roomname,productname,cost): Promise<void> {
    const prodId: string = this.fireStore.createId();
    return this.fireStore
      .doc<Product>(`productList/${prodId}`)
      .set({
        id: prodId,
        roomname:roomname.trim(),
          productname:productname.trim(),
        cost,
       status:true
      });
  }
  updateProduct(prodid,roomname,productname,cost): Promise<void> {
    const productRef = this.fireStore.doc(`/productList/${prodid}/`);
    return productRef
      .update({
        roomname:roomname.trim(),
          productname:productname.trim(),
        cost
      });
  }
  
  updateMaterial(matid,roomname,productname,materialname,materialtype,psqft): Promise<void> {
    const materialRef = this.fireStore.doc(`/MaterialList/${matid}/`);
    return materialRef
      .update({
        roomname:roomname.trim(),
        productname:productname.trim(),
        materialname:materialname.trim(),
        materialtype,
        psqft,
       status:true
      });
  }
  updateAppliance(appid,producttype,Category,productname,vendor,rate): Promise<void> {
    const applianceRef = this.fireStore.doc(`/applianceList/${appid}/`);
    return applianceRef
      .update({
        producttype:producttype.trim(),
        Category:Category.trim(),
        productname:productname.trim(),
        vendor:vendor.trim(),
        rate,
       status:true
      });
  }
   updateAccessory(accid,Category,productname,vendor,rate): Promise<void> {
    const accessoryRef = this.fireStore.doc(`/accessoriesList/${accid}/`);
    return accessoryRef
      .update({
        Category:Category.trim(),
        productname:productname.trim(),
        vendor:vendor.trim(),
        rate,
       status:true
      });
  }
  
    createMaterial(roomname,productname,materialname,materialtype,psqft): Promise<void> {
    const materialId: string = this.fireStore.createId();
    return this.fireStore
      .doc<Material>(`MaterialList/${materialId}`)
      .set({
        id: materialId,
        roomname:roomname.trim(),
        productname:productname.trim(),
        materialname:materialname.trim(),
        materialtype,
        psqft,
       status:true
      });
  }
createAccessory(Category,productname,vendor,rate): Promise<void> {
    const accessoryId: string = this.fireStore.createId();
    return this.fireStore
      .doc<Accessory>(`accessoriesList/${accessoryId}`)
      .set({
        id: accessoryId,
        Category:Category.trim(),
        productname:productname.trim(),
        vendor:vendor.trim(),
        rate,
       status:true
      });
  }
  createAppliance(producttype,Category,productname,vendor,rate): Promise<void> {
    const applianceId: string = this.fireStore.createId();
    return this.fireStore
      .doc<Appliance>(`applianceList/${applianceId}`)
      .set({
        id: applianceId,
        producttype:producttype.trim(),
        Category:Category.trim(),
        productname:productname.trim(),
        vendor:vendor.trim(),
        rate,
       status:true
      });
  }
  createQuotation(QuoteForm): Promise<void> {
    const quoteId: string = this.fireStore.createId();
   QuoteForm.id=quoteId;
   var currentdate = new Date(); 
 var submitdate = new Date(currentdate.getFullYear(),
                    (currentdate.getMonth()+1),
                    currentdate.getDate(),
                 currentdate.getHours(), 
               currentdate.getMinutes(),
               currentdate.getSeconds()).getTime();
QuoteForm.timestamp=submitdate;
QuoteForm.createdBy=this.userId;
    return this.fireStore
      .doc<Quotation>(`QuoteList/${quoteId}`)
      .set(QuoteForm);
  }
  
  
  addGroceryQuantity(
    groceryId: string,
    quantity: number,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number = groceryDoc.data().quantity + quantity;
        transaction.update(groceryRef, { quantity: newQuantity });
      });
    });
  }

  removeGroceryQuantity(
    groceryId: string,
    quantity: number,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number = groceryDoc.data().quantity - quantity;
        transaction.update(groceryRef, { quantity: newQuantity });
      });
    });
  }

  addGroceryToShoppingList(groceryId: string, teamId: string): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    );

    return groceryRef.update({
      inShoppingList: true
    });
  }

  removeGroceryFromShoppingList(
    groceryId: string,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    );

    return groceryRef.update({
      inShoppingList: false
    });
  }

  pickUpGroceryFromShoppingList(
    groceryId: string,
    quantityShopping: number,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number =
          groceryDoc.data().quantity + quantityShopping;

        transaction.update(groceryRef, {
          quantity: newQuantity,
          quantityShopping: quantityShopping,
          picked: true
        });
      });
    });
  }

  addQuantityGroceryFromShoppingList(
    groceryId: string,
    quantityShopping: number,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number =
          groceryDoc.data().quantity + quantityShopping;
        const newQuantityShopping: number =
          groceryDoc.data().quantityShopping + quantityShopping;
        transaction.update(groceryRef, {
          quantity: newQuantity,
          quantityShopping: newQuantityShopping,
          picked: true
        });
      });
    });
  }

  removeQuantityGroceryFromShoppingList(
    groceryId: string,
    quantityShopping: number,
    teamId: string
  ): Promise<void> {
    const groceryRef = this.fireStore.doc(
      `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.fireStore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number =
          groceryDoc.data().quantity - quantityShopping;
        const newQuantityShopping: number =
          groceryDoc.data().quantityShopping - quantityShopping;
        transaction.update(groceryRef, {
          quantity: newQuantity,
          quantityShopping: newQuantityShopping,
          picked: true
        });
      });
    });
  }
}
