import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Recenzii } from './models/recenzii';
import { map } from 'rxjs/operators';

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
    return this.db.list<Recenzii>('/products/' + product + '/recenzii').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.val() as Recenzii;
          const key = c.payload.key;
          return { key, ...data };
        })
      )
    );
  }



  editRecenzie(productId, recenzieId, recenzie){
    return this.db.object('/products/' + productId + '/recenzii/' + recenzieId).update(recenzie);
  }

  get(productId) {
    return this.db.object('/products/' + productId + '/recenzii').snapshotChanges();
  }

  update(productId, product, recenzieId) {
    return this.db.object('/products/' + productId + '/recenzii/' + recenzieId).update(product); 
  }

  updateReview(productId, recenzieId, steleRecenzie, continutRecenzie, uid){
    const recenzieRef = this.db.object('/products/' + productId + '/recenzii/' + recenzieId);
    const recenzieData: Recenzii = {
      stele: steleRecenzie,
      continut: continutRecenzie,
      uid: uid
    }
    recenzieRef.update(recenzieData);
  }

  delete(productId, recenzieId) {
    this.db.object('/products/' + productId + '/recenzii/' + recenzieId).remove();
    window.location.reload();
  }
}
