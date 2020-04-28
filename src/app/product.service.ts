import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rx';
import { Product } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {}

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges();
    // .pipe(
    // map(actions =>
    // actions.map(a => ({ key: a.key, ...a.payload.val() } as Product))
    // )
    // );
     }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }
}
