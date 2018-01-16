import { Component,OnInit,NgZone } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { PdfServiceProvider } from '../../providers/pdf-service/pdf-service';

//import { Quotation } from '../../models/quotation';
import { Observable } from 'rxjs';
import {EmailValidator} from '../../validators/email';
import { Product } from '../../models/Product';
//import { Room } from '../../models/room';
import { Material } from '../../models/Material';
import { Appliance } from '../../models/Appliance';
import { Accessory } from '../../models/Accessory';



/**
 * Generated class for the QuotationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotation',
  templateUrl: 'quotation.html',
})
export class QuotationPage implements OnInit{
public QuoteForm: FormGroup; // our form model
productList: Observable<Product[]>;
  roomproductList: Observable<Product[]>;
  internalmaterialList:Observable<Material[]>;
  shuttermaterialList:Observable<Material[]>;
  Categories:Observable<Accessory[]>;
  accList:Observable<Accessory[]>;
  AppCategories:Observable<Appliance[]>;
  appList:Observable<Appliance[]>;
  appTypes:Observable<Appliance[]>;
public info:any;
public subtotal:any;
public price:any;
public rpList:any[];
public intmatList:any[];
public shutmatList:any[];
public categoriesList:any[];
public accessoriesList:any[];
public appcategoriesList:any[];
public applicationList:any[];
public appliancesList:any[];
public quoteid:string;
public docDefinition:any;
public pdfUrl:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private _fbr:FormBuilder,public inventoryProvider: InventoryProvider,public pdfservice:PdfServiceProvider) {
        
this.info='woodwork';
        this.productList = this.inventoryProvider
        .getproductList()
        .valueChanges();
        this.Categories=this.inventoryProvider
        .getAccessoriesList()
        .valueChanges();
        this.AppCategories = this.inventoryProvider
        .getAppliancesList()
        .valueChanges();
    this.appTypes = this.inventoryProvider
        .getAppliancesList()
        .valueChanges();
      this.rpList=[];     
this.intmatList=[];
this.shutmatList=[];
this.categoriesList=[];
this.accessoriesList=[];
this.appcategoriesList=[];
this.applicationList=[];
this.appliancesList=[];

    }
    
ngOnInit() {
    
        
    // we will initialize our form here
    this.QuoteForm = this._fbr.group({
            custname: ['', [Validators.required, Validators.minLength(3)]],
            woodworkdetails:this._fbr.array([this.initwoodworkdetails()]),
            accdetails:this._fbr.array([this.initaccdetails()]),
            appdetails:this._fbr.array([this.initappdetails()]),
            contactnum:['',Validators.minLength(10)],
            custaddr:[''],
            email:[''],
            custcat:[''],
            model:[''],
            custpay:[''],
            qDueDate:[],
           qStatus:[],
           grandTotal:[0]
        });

            }
            
    initwoodworkdetails() {
        // initialize our woodworkdetails
        return this._fbr.group({
            roomname:[], 
  productname:[], 
  price:[{value:0,disabled:true}],
  intmaterial:[], 
  shutmaterial:[],
  glass:[],
  width:[], 
  height:[], 
  area:[{value:0,disabled:true}], 
  total:[{value:0,disabled:true}] ,
  woodworkcomm:['']
        });
    }
    initaccdetails() {
        // initialize our accessories details
        return this._fbr.group({
  accname:[], 
  accprice:[{value:0,disabled:true}],
  accCategory:[], 
  accVendor:[{value:'',disabled:true}],
  accqty:[],
  acctotal:[{value:0,disabled:true}],
  acccomm:['']
        });
    }
    initappdetails() {
        // initialize our appliances details
        return this._fbr.group({
  appname:[], 
  appprice:[{value:0,disabled:true}],
  appCategory:[], 
  appVendor:[{value:'',disabled:true}],
  appqty:[],
  apptotal:[{value:0,disabled:true}],
  apptype:[],
  appcomm:[]
        });
    }
    
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotationPage');

  }
 addwoodworkdetails(i: number) {
        const control = <FormArray>this.QuoteForm.controls['woodworkdetails'];
        const addCtrl = this.initwoodworkdetails()
         this.productList = this.inventoryProvider
        .getproductList()
        .valueChanges();
        control.push(addCtrl);
    }

    removewoodworkdetails(i: number) {
        const control = <FormArray>this.QuoteForm.controls['woodworkdetails'];
        control.removeAt(i);
    }
    addaccdetails(i: number) {
        const acccontrol = <FormArray>this.QuoteForm.controls['accdetails'];
        const accaddCtrl = this.initaccdetails();
         acccontrol.push(accaddCtrl);
         this.Categories = this.inventoryProvider
        .getAccessoriesList()
        .valueChanges();
       
    }

    removeaccdetails(i: number) {
        const accrcontrol = <FormArray>this.QuoteForm.controls['accdetails'];
        accrcontrol.removeAt(i);
    }
    
    addappdetails(i: number) {
            const appcontrol = <FormArray>this.QuoteForm.controls['appdetails'];
        const appaddCtrl = this.initappdetails();
        appcontrol.push(appaddCtrl);
         this.appTypes = this.inventoryProvider
        .getAppliancesList()
        .valueChanges();
        
    }

    removeappdetails(i: number) {
        const apprcontrol = <FormArray>this.QuoteForm.controls['appdetails'];
        apprcontrol.removeAt(i);
    }
    
    
    setArea(n){
       var group = this.QuoteForm as FormGroup;
        var array = group.controls['woodworkdetails'] as FormArray;
       return  (array.at(n).get('width').value?(array.at(n).get('width').value*1):0)*(array.at(n).get('height').value?(array.at(n).get('height').value*1):0)/93025;   
    }
    setsubTotal(n){
       var group = this.QuoteForm as FormGroup;
        var array = group.controls['woodworkdetails'] as FormArray;
        var iprice=array.at(n).get('intmaterial').value;
        var sprice=array.at(n).get('shutmaterial').value;
        var str=array.at(n).get('productname').value;
        var pprice = str?str.substring(str.indexOf(":") + 1):null;
        var area = (array.at(n).get('width').value?(array.at(n).get('width').value*1):0)*(array.at(n).get('height').value?(array.at(n).get('height').value*1):0)/93025;
        
return (pprice?pprice*1:0)+(area*((iprice?iprice:0)*1+(sprice?sprice:0)*1));
   
    }
    setAccsubTotal(n){
       var accsubgroup = this.QuoteForm as FormGroup;
        var accsubarray = accsubgroup.controls['accdetails'] as FormArray;
       var accqty=accsubarray.at(n).get('accqty').value;
       var accprice=accsubarray.at(n).get('accprice').value;
       
return ((accprice?accprice:0)*1)*((accqty?accqty:0)*1);
   
    }
    setappsubTotal(n){
       var appsubgroup = this.QuoteForm as FormGroup;
        var appsubarray = appsubgroup.controls['appdetails'] as FormArray;
       var appqty=appsubarray.at(n).get('appqty').value;
       var appprice=appsubarray.at(n).get('appprice').value;
       
return ((appprice?appprice:0))*((appqty?appqty:0));
   
    }
    
    setProductList(room:string,index:number){
        this.roomproductList= this.inventoryProvider
        .getroomproductList(room)
        .valueChanges();
this.rpList.splice(index, 0, this.roomproductList);   
    }
    
    setAccessoryList(acc:string,index:number){
this.accList = this.inventoryProvider
        .getaccprodList(acc)
        .valueChanges();
      this.accessoriesList.splice(index, 0, this.accList); 
    }
    
    setAppliancesList(app:string,index:number){
this.appList = this.inventoryProvider
        .getappProdList(app)
        .valueChanges(); 
this.appliancesList.splice(index, 0, this.appList);       
    }
    
  setAppliancesCategory(app:string,index:number){
this.AppCategories = this.inventoryProvider
        .getappCategoryList(app)
        .valueChanges(); 
this.appcategoriesList.splice(index, 0, this.AppCategories);          
  }  
setAccessoryData(acc:string,n:number){
    var saccgroup = this.QuoteForm as FormGroup;
        var saccarray = saccgroup.controls['accdetails'] as FormArray;
        saccarray.at(n).get('accVendor').setValue(acc.substring(0,acc.indexOf(":")));
        saccarray.at(n).get('accprice').setValue(acc.substring(acc.indexOf(":")+1));       
}
setAppliancesData(acc:string,n:number){
    var sappgroup = this.QuoteForm as FormGroup;
        var sapparray = sappgroup.controls['appdetails'] as FormArray;
        sapparray.at(n).get('appVendor').setValue(acc.substring(0,acc.indexOf(":")));
        sapparray.at(n).get('appprice').setValue(acc.substring(acc.indexOf(":")+1));       
}

     setMaterialList(prodid:string,i){
        var productid = prodid.substring(0,prodid.indexOf(":"));
       if(productid){
 this.inventoryProvider.getProductName(productid).then(product=>{
          this.internalmaterialList = this.inventoryProvider
        .getproductMaterialList(product,'Internal Material')
        .valueChanges(); 
        
      this.shuttermaterialList = this.inventoryProvider
        .getproductMaterialList(product,'Shutter Material')
        .valueChanges();
    this.intmatList.splice(i, 0, this.internalmaterialList); 
 this.shutmatList.splice(i, 0, this.shuttermaterialList);     
        });
 
    }
    }
    
    getwoodworkPrice(){
    var group = this.QuoteForm as FormGroup;
    var array = group.controls['woodworkdetails'] as FormArray;
    var total=0;
    for (var n=0;n< array.length;n++){
     total += this.setsubTotal(n); 
    }
    return total;
}
 getaccPrice(){
    var getaccPricegroup = this.QuoteForm as FormGroup;
    var getaccarray = getaccPricegroup.controls['accdetails'] as FormArray;
    var getacctotal=0;
    for (var n=0;n< getaccarray.length;n++){
     getacctotal += this.setAccsubTotal(n); 
    }
    return getacctotal;
}
 getappPrice(){
    var getappPricegroup = this.QuoteForm as FormGroup;
    var getapparray = getappPricegroup.controls['appdetails'] as FormArray;
    var getapptotal=0;
    for (var n=0;n< getapparray.length;n++){
     getapptotal += this.setappsubTotal(n); 
    }
    return getapptotal;
}
getgrandTotal(){
    return this.getwoodworkPrice()+this.getaccPrice()+this.getappPrice();
}
async save(): Promise<any> {
    if (!this.QuoteForm.valid) {
      console.log('Form not ready');
    } else {
                              
      /*  var group = this.QuoteForm as FormGroup;
    var warray = group.controls['woodworkdetails'] as FormArray;
    var accarray = group.controls['accdetails'] as FormArray;
    var apparray = group.controls['appdetails'] as FormArray;

    for (var x=0;x< warray.length;x++){
      warray.at(x).get('total').setValue(this.setsubTotal(x));
      warray.at(x).get('area').setValue(this.setArea(x));
    }
     for (var y=0;y< accarray.length;y++){
      accarray.at(y).get('acctotal').setValue(this.setAccsubTotal(y));
    }
     for (var z=0;z< apparray.length;z++){
      apparray.at(z).get('apptotal').setValue(this.setappsubTotal(z));
    }*/
    this.QuoteForm.get('grandTotal').setValue(this.getgrandTotal());
      this.QuoteForm.get('qStatus').setValue('New');
      let loading: Loading;
      loading = this.loadingCtrl.create();
      loading.present();
      
      try {
        await this.inventoryProvider.createQuotation(this.QuoteForm.value);
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
  
  
   // open the PDF in a new window
   createPDF(){
       var reportName='Quotation';
                var qdata= this.QuoteForm.value;
                this.pdfUrl=this.pdfservice.createPdf(qdata)
                        .then(function(pdf) {
                            var blob = new Blob([pdf], {type: 'application/pdf'});
                           var pUrl = URL.createObjectURL(blob);
                           
                           return pUrl;
                        })
               console.log('pdf=',this.pdfUrl); 
               /* var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
 a.href = this.pdfUrl;
        a.download = 'report.pdf';
        a.click();
        window.URL.revokeObjectURL(this.pdfUrl);    */      
    }

    // open the PDF in a new window
   async downloadPDF(){
                var qdata= this.QuoteForm.value;
              var pdf=await this.pdfservice.createPdf(qdata);
                 
    }

   }
