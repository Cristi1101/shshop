import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  priceMin: number;
  priceMax: number;
  cart: any;
  subscription: Subscription;
  search: string;
  hideSearchDropDown: boolean = false;

  @ViewChild('toggleDrop') toggleDrop: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private renderer: Renderer2) {
    this.filterProducts();

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleDrop.nativeElement && e.target !== this.menu.nativeElement) {
        this.hideSearchDropDown = true;
      }
    });
  }

  receiveFilter($event) {
    this.priceMin = $event[0];
    this.priceMax = $event[1];
    this.filterProducts();
  }

  filterProducts() {
    this.productService
      .getAll().pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter((p) =>
            (p.category === this.category && p.price >= this.priceMin && p.price <= this.priceMax)
          ) : (this.priceMin && this.priceMax ?
            this.products.filter((p) =>
              (p.price >= this.priceMin && p.price <= this.priceMax)
            ) : this.products);
      });
  }

  setSearch(title) {
    this.search = title;
    this.hideSearchDropDown = true;
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
