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

  private create(){
    return this.db.list('/favorites').push({
      dateCreated: new Date().getTime(),
      userId: this.userID
    });
  }

  async getCart()  {
    //let cartId = await this.getOrCreateCartId();
    return this.db.object('/favorites/' + this.userID);
  }

  getItem(cartId: string, productId: string){
    return this.db.object('/favorites/' + cartId + '/items/' + productId);
  }

  // private async getOrCreateCartId(): Promise<string> {
  //   //let cartId = localStorage.getItem('cartId');
  //   if(this.userID) return this.userID;

  //   // we don't have a shopping cart
  //   let result = await this.create();
  //   localStorage.setItem('cartId', result.key);
  //   return result.key;
  // }

  async add(product: Product) {
    
    this.updateFavorite(product, 1);
  }

  async remove(product: Product){
    this.updateFavorite(product, -1);
  }

 validate(pid: string): Observable<any>{
    return this.db.object('/favorites/' +  this.userID + '/items/' + pid).valueChanges(); 
  }

  async clear(){
    //let cartId = await this.getOrCreateCartId();
    this.db.object('/favorites/' + this.userID + '/items').remove();
  }

  private async updateFavorite(product: Product, change: number){
    //let cartId = await this.getOrCreateCartId();
    let item = this.getItem(this.userID, product.key);

    item.snapshotChanges().pipe(take(1)).subscribe((data) => {
        item.update({ product: product});
    });
  }
}
