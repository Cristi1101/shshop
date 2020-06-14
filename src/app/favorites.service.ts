import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  userID = localStorage.getItem('userUID');
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/favorites').push({
      dateCreated: new Date().getTime(),
      userId: this.userID
    });
  }

  async getCart() {
    return this.db.object('/favorites/' + this.userID);
  }

 getFavourites() {
    return this.db.list('/favorites/' + this.userID + "/items").snapshotChanges(); 
  }

  getItem(cartId: string, productId: string) {
    return this.db.object('/favorites/' + cartId + '/items/' + productId);
  }

  async add(product: Product) {

    this.updateFavorite(product, true);
  }

  async remove(product: Product) {
    this.updateFavorite(product, false); 
  }

  validate(pid: string): Observable<any> {
    return this.db.object('/favorites/' + this.userID + '/items/' + pid).valueChanges();
  }

  async clear() {
    //let cartId = await this.getOrCreateCartId();
    this.db.object('/favorites/' + this.userID + '/items').remove();
  }

  private async updateFavorite(product: Product, toAdd: boolean) {
    if (toAdd == true) {
      let item = this.getItem(this.userID, product.key);
      item.snapshotChanges().pipe(take(1)).subscribe((data) => {
        item.update({ product: product });
      });
    }
    else {
      this.db.object('/favorites/' + this.userID + '/items/' + product.key).remove();
    }
  }
}
