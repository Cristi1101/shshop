import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})

export class ShoppingCartSummaryComponent {
  shoppingCartItemCount: number;
  cart$;
  cart: ShoppingCart = new ShoppingCart(null);
  shoppingCartTotalPrice: number;
  shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

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