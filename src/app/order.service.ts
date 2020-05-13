import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from './models/order';
import { map } from 'rxjs/operators';
//import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  get(orderId) {
    return this.db.object('/orders/' + orderId).valueChanges(); 
  }

  getItems(orderId) {
    return this.db.list<Order>('/orders/' + orderId + '/item/').snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val() as Order;
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
    return this.db.list<Order>('/orders')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Order;
                    const key = c.payload.key;
                    return { key, ...data };
                })
            )
        );
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
