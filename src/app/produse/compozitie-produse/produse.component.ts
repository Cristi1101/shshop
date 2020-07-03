import { Component, Input, OnInit } from '@angular/core';
import { Produs } from '../../models/produs';
import { ServiciuCosDeCumparaturi } from '../../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../../models/cos-de-cumparaturi';
import { ServiciuProduse } from '../../serviciu-produse.service';
import { ServiciuFavorite } from '../../serviciu-favorite.service';

@Component({
  selector: 'produse',
  templateUrl: './produse.component.html',
  styleUrls: ['./produse.component.css']
})

export class Produse implements OnInit {
  @Input('product') product: Produs;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: CosDeCumparaturi;

  checked: boolean;

  constructor(
    private cartService: ServiciuCosDeCumparaturi,
    private productService: ServiciuProduse,
    private favoritService: ServiciuFavorite) { }

  visited() {
    if (this.product.visits == null) this.product.visits = 0;

    this.product.visits++;
    this.product.time = new Date().getTime();
    this.productService.update(this.product.key, this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  toggleFavourite() {
    if (this.checked == true) {
      this.favoritService.remove(this.product);
    } else {
      this.favoritService.add(this.product);
    }
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  ngOnInit() {
    this.checked = false;
    this.favoritService.validate(this.product.key).subscribe(data => {
      if (data) {
        this.checked = true;
      }
    });
  }
}
