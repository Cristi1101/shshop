import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../product.service';

let produsVizitat: number = 0;
let produsVizitat2: number = 0;
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService, private productService: ProductService) { }

  

  addToCart(){
    //update 'visits' field in every product
    //produsVizitat2 = this.product.visits;
    if( this.product.visits == null) this.product.visits = 0;
    this.product.visits++;
    if( this.product.visits > produsVizitat) produsVizitat = this.product.visits;
    //else produsVizitat2 = this.product.visits;
    console.log("cel mai vizitat produs:", produsVizitat);
    //if( (produsVizitat2 > this.product.visits) && (produsVizitat2 < produsVizitat) ) produsVizitat2 = this.product.visits;
    //console.log("Al doilea cel mai vizitat produs:", produsVizitat2);
    this.productService.update(this.product.key, this.product);

    this.cartService.addToCart(this.product);
  } 

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    
    return item ? item.quantity : 0;
    //console.log("this item was clicked:", this.contor, " times!");
  }

  // productClicked(event){
  //   console.log("this product was clicked:", event); 
  // }
}
