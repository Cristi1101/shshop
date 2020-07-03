import { Component, Input } from '@angular/core';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';

@Component({
  selector: 'rezumat-cos-de-cumparaturi',
  templateUrl: './rezumat-cos-de-cumparaturi.component.html',
  styleUrls: ['./rezumat-cos-de-cumparaturi.component.css']
})

export class RezumatCosDeCumparaturi {
  shoppingCartItemCount: number;
  cart$;
  cart: CosDeCumparaturi = new CosDeCumparaturi(null);
  shoppingCartTotalPrice: number;
  shoppingCart: CosDeCumparaturi;

  constructor(private shoppingCartService: ServiciuCosDeCumparaturi) { }

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