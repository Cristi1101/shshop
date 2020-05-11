import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime() 
    });
  }

  // createVisitedProducts(visited){
  //   return this.db.list('/products-visited').push(visited);
  // }

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

    // we don't have a shopping cart
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  // async addToCart (product: Product){
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object('shopping-carts/' + cartId + '/items/' + product.key);
  //   item$.snapshotChanges().pipe(take(1)).subscribe( (item: any) => {
  //     if(item.key != null) item$.update({ quantity: item.quantity + 1 });
  //     else item$.set({ product: product, quantity: 1 });
  //   })
  // }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.key);

    item.snapshotChanges().pipe(take(1)).subscribe((data) => {
      let quantityAux = (data.payload.child('/quantity').val() || 0) + change;
      if(quantityAux === 0) item.remove();
      else
        item.update({ product: product, quantity: quantityAux });
    });
  }
}
