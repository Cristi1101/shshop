import { Component, OnInit } from '@angular/core';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';

@Component({
  selector: 'bara-de-navigatie',
  templateUrl: './bara-de-navigatie.component.html',
  styleUrls: ['./bara-de-navigatie.component.css']
})
export class BaraDeNavigatie implements OnInit {
  appUser: Utilizator;
  shoppingCartItemCount: number;
  cart$;

  constructor(
    private auth: ServiciuDeAutentificare,
    private shoppingCartService: ServiciuCosDeCumparaturi) { }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe((cart: CosDeCumparaturi) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }
}
