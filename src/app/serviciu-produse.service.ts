import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Produs } from './models/produs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciuProduse {
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
    return this.db.list<Produs>('/products')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Produs;
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
