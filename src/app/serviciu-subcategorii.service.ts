import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuSubcategorii {

  constructor(private db: AngularFireDatabase) { }

  getSubcategories() {
    return this.db.list('/subcategories').snapshotChanges();
  }
}
