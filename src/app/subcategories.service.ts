import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private db: AngularFireDatabase) { }

  getSubcategories(){
    return this.db.list('/subcategories').snapshotChanges();
  }

  // getAllSubcategories() { 
  //   return this.db.list('/subcategories', ref => ref.orderByChild('parentId')).snapshotChanges();
  // }
}
