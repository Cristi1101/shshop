import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  //filteredProducts2: Product[] = [];
  category: string;
  priceMin: number;
  priceMax: number;
  cart: any;
  subscription: Subscription;
  mostVisitedProducts = [];
  lastVisitedProducts = [];

  selectedIndex = 0;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService)
  { 
    //var mostViewedPosts = productService.getAll().orderByChild();
    //this.mostVisitedProducts();
    this.filterProducts();

    this.productService.getMostVisitedProducts().subscribe(data => {
      let aux;
      for(let i = 0; i < data.length / 2; i++){
        aux = data[i];
        data[i] = data [data.length-i-1];
        data [data.length-i-1] = aux;
      }

      this.mostVisitedProducts = data;
      console.log("ceva:", this.mostVisitedProducts);
    });

    this.productService.getLastVisitedProducts().subscribe(data => {
      let aux;
      for(let i = 0; i < data.length / 2; i++){
        aux = data[i];
        data[i] = data [data.length-i-1];
        data [data.length-i-1] = aux;
      }
      this.lastVisitedProducts = data;
      console.log("timp:", this.lastVisitedProducts);
    });
    
  } 

  receiveFilter($event){
    this.priceMin = $event[0];
    this.priceMax = $event[1];
    this.filterProducts();

    //console.log("priceMin:", this.priceMin);
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

  // mostVisitedProducts(){
  //   //this.productService.order();
  // //   this.productService.getAll().subscribe(items => {
  // //     let n = items.length;
  // //     items.sort(a => {
  // //       a.visits > a.visits
  // //     })
  // //     for(let item of items){
  // //       items
  // //     }

  // //     console.log(items);
  // //   })

  // this.productService
  //   .getAll().pipe(
  //   switchMap((products: Product[]) => {
  //     this.products = products;
  //     return this.route.queryParamMap;
  //   })
  //   )
  //   .subscribe((params) =>{
  //     this.visits = parseInt(params.get('visits'));
  //     //console.log("constructor2:", this.price);
  //     this.filteredProducts = (this.visits) ?
  //       this.products.filter((p) =>
  //        (p.category === this.category && p.price >= this.priceMin && p.price <= this.priceMax)
  //       ) : (this.priceMin && this.priceMax ? 
  //         this.products.filter((p) =>
  //        (p.price >= this.priceMin && p.price <= this.priceMax)
  //       ) : this.products);
  //   });
  //  }
  
  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges().subscribe(cart => this.cart = cart);
      
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
