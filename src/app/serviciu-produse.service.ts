import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Produs } from './models/produs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciuProduse {
  constructor(private bazaDeDate: AngularFireDatabase) { }

  creareProdus(product) {
    return this.bazaDeDate.list('/products').push(product);
  }

  celeMaiVizitateProduse() {
    return this.bazaDeDate.list('/products',
      ref => ref.orderByChild('visits').limitToLast(5)).valueChanges();
  }

  ultimeleProduseVizitate() {
    return this.bazaDeDate.list('/products',
      ref => ref.orderByChild('time').limitToLast(5)).valueChanges();
  }

  toateProdusele() {
    return this.bazaDeDate.list<Produs>('/products')
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

  toateProdusele2(productId) {
    return this.bazaDeDate.object('/products/' + productId).snapshotChanges();
  }

  actualizareProdus(productId, product) {
    return this.bazaDeDate.object('/products/' + productId).update(product);
  }

  stergeProdus(productId) {
    return this.bazaDeDate.object('/products/' + productId).remove();
  }
}
