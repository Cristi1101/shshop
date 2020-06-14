import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getMostVisitedProducts() {
    return this.db.list('/products',
      ref => ref.orderByChild('visits').limitToLast(5)).valueChanges();
  }

  getLastVisitedProducts() {
    return this.db.list('/products',
      ref => ref.orderByChild('time').limitToLast(5)).valueChanges();
  }

  getAll() {
    return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Product;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
