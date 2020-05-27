import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Recenzii } from './models/recenzii';

@Injectable({
  providedIn: 'root'
})
export class RecenziiService {
  constructor(private db: AngularFireDatabase) { }

  userID = localStorage.getItem('userUID');
  produse;

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

  getAll(product) {
    return this.db.list<Recenzii>('/products/' + product + '/recenzii').valueChanges();
  }

  getAllMyReviews(product) {
    return this.db.list<Recenzii>('/products/' + product + '/recenzii').valueChanges();
  }

  editRecenzie(productId, recenzieId, recenzie){
    return this.db.object('/products/' + productId + '/recenzii/' + recenzieId).update(recenzie);
  }

  get(productId) {
    return this.db.object('/products/' + productId + '/recenzii').snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
