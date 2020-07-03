import { Component, OnInit, Input } from '@angular/core';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';
import { Produs } from '../models/produs';
import { Router } from '@angular/router';

@Component({
  selector: 'cosul-de-cumparaturi',
  templateUrl: './cosul-de-cumparaturi.component.html',
  styleUrls: ['./cosul-de-cumparaturi.component.css']
})

export class CosulDeCumparaturi implements OnInit {
  cart: CosDeCumparaturi = new CosDeCumparaturi(null);
  shoppingCartItemCount: number;
  shoppingCartTotalPrice: number;
  cart$;
  shoppingCart: CosDeCumparaturi;

  constructor(
    private router: Router,
    private shoppingCartService: ServiciuCosDeCumparaturi) { }

  addToCart(product: Produs) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: Produs) {
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
      this.cart = new CosDeCumparaturi(data);
      this.shoppingCartItemCount = this.cart.totalItemsCount;
      this.shoppingCartTotalPrice = this.cart.totalPrice;
    });
  }
}