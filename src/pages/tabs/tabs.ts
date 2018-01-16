import { Component } from '@angular/core';

import { InventoryListPage } from '../inventory-list/inventory-list';
import { QuoteListPage } from '../quote-list/quote-list';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = InventoryListPage;
  tab3Root = QuoteListPage;

  constructor() {

  }
}
