import { Component, OnInit, OnDestroy} from '@angular/core';
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
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  priceMin: number;
  priceMax: number;
  cart: any;
  subscription: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService)
  { 
    this.filterProducts();
  } 

  receiveFilter($event){
    this.priceMin = $event[0];
    this.priceMax = $event[1];
    this.filterProducts();

    console.log("priceMin:", this.priceMin);
  }

  filterProducts(){
    this.productService
    .getAll().pipe(
    switchMap((products: Product[]) => {
      this.products = products;
      return this.route.queryParamMap;
    })
    )
    .subscribe((params) =>{
      this.category = params.get('category');
      //console.log("constructor2:", this.price);
      this.filteredProducts = (this.category) ?
        this.products.filter((p) =>
         (p.category === this.category && p.price >= this.priceMin && p.price <= this.priceMax)
        ) : (this.priceMin && this.priceMax ? 
          this.products.filter((p) =>
         (p.price >= this.priceMin && p.price <= this.priceMax)
        ) : this.products);
    });
  }


  
  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges().subscribe(cart => this.cart = cart);
      
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
