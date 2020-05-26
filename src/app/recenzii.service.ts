import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class RecenziiService {
  constructor(private db: AngularFireDatabase) { }

  userID = localStorage.getItem('userUID');

  create(recenzie, product) {
    return this.db.list('/products/' + product + '/recenzii').push(recenzie);
  }

  // getMostVisitedProducts(){
  //   return this.db.list('/products', 
  //     ref => ref.orderByChild('visits').limitToLast(5)).valueChanges();
  // }

  // getLastVisitedProducts(){
  //   return this.db.list('/products', 
  //     ref => ref.orderByChild('time').limitToLast(5)).valueChanges();
  // }

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
