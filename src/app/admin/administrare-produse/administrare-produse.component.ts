import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciuProduse } from 'src/app/serviciu-produse.service';
import { Subscription } from 'rxjs/Subscription';
import { Produs } from 'src/app/models/produs';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'administrare-produse',
  templateUrl: './administrare-produse.component.html',
  styleUrls: ['./administrare-produse.component.css']
})

export class AdministrareProduse implements OnInit, OnDestroy {
  products: Produs[] = [];
  subscription: Subscription;
  tableResource: DataTableResource<Produs>;
  items: Produs[] = [];
  itemCount: number;

  constructor(private productService: ServiciuProduse) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Produs[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initializeTable(filteredProducts);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
