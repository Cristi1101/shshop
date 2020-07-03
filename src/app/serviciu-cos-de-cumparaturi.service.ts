import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Produs } from './models/produs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCosDeCumparaturi {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime() 
    });
  }

  async getCart()  {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Produs) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Produs){
    this.updateItemQuantity(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItemQuantity(product: Produs, change: number){
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.key);

    item.snapshotChanges().pipe(take(1)).subscribe((data) => {
      let quantityAux = (data.payload.child('/quantity').val() || 0) + change;
      if(quantityAux === 0) item.remove();
      else
        item.update({ product: product, quantity: quantityAux });
        if(quantityAux == 1){
          window.location.reload();
        }
    });
  }
}
