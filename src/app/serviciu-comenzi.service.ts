import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServiciuCosDeCumparaturi } from './serviciu-cos-de-cumparaturi.service';
import { Comanda } from './models/comanda';
import { map } from 'rxjs/operators';
//import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class ServiciuComenzi {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ServiciuCosDeCumparaturi) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  get(orderId) {
    return this.db.object('/orders/' + orderId).snapshotChanges();  
  }

  getItems(orderId) {
    return this.db.list<Comanda>('/orders/' + orderId + '/item/').snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val() as Comanda;
              const key = c.payload.key;
              return { key, ...data };
          })
      )
  );
  }
 
  getOrders(){
    return this.db.list('/orders').snapshotChanges();
  }

  getAll() {
    return this.db.list<Comanda>('/orders')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Comanda;
                    const key = c.payload.key;
                    return { key, ...data };
                })
            )
        );
  }

  getUserOrders(userId: string) {
    return this.db.list<Comanda>('/orders', ref => ref.orderByChild('userId').equalTo(userId))
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Comanda;
                    const key = c.payload.key;
                    return { key, ...data };
                })
            )
        );
  }

  updateOrder(orderId, order) {
    return this.db.object('/orders/' + orderId).update(order);
  }

  // getOrdersByUser(userId: string) {
  //   return this.db.list('/orders', {
  //     query: {
  //       orderByChild: 'userId';
  //       equalTo: userId;  
  //     }
  //   });
  // }
}
