import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import {HomePage} from '../pages/home/home';
import {InventoryPageModule} from '../pages/inventory/inventory.module';
import {InventoryListPageModule} from '../pages/inventory-list/inventory-list.module';
import {QuoteListPageModule} from '../pages/quote-list/quote-list.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';
import { InventoryProvider } from '../providers/inventory/inventory';
import {PipesModule} from '../pipes/pipes.module';
import { QuotationProvider } from '../providers/quotation/quotation';
import { PdfServiceProvider } from '../providers/pdf-service/pdf-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MyApp, TabsPage,HomePage],
  imports: [
  InventoryPageModule,
  InventoryListPageModule,
  QuoteListPageModule,
  PipesModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage,HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    InventoryProvider,
    AuthProvider,
    InventoryProvider,
    QuotationProvider,
    PdfServiceProvider
  ]
})
export class AppModule {}
