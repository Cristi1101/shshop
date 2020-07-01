import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private db: AngularFireDatabase) { }

  getOrderStatus(){
    return this.db.list('/orderStatus').snapshotChanges();
  }

  // getAll() { 
  //   return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  // }
}
