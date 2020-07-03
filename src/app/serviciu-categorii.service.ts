import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCategorii {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories').snapshotChanges();
  }

  getAll() { 
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
