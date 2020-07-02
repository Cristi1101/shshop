import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart = new ShoppingCart(null);
  shoppingCartItemCount: number;
  shoppingCartTotalPrice: number;
  cart$;
  shoppingCart: ShoppingCart;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
    this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe((temp) => {
      let data: any;
      data = temp.items;
      this.cart = new ShoppingCart(data);
      this.shoppingCartItemCount = this.cart.totalItemsCount;
      this.shoppingCartTotalPrice = this.cart.totalPrice;
    });
  }
}