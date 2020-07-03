import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCulori {

  constructor(private db: AngularFireDatabase) { }

  getColors(){
    return this.db.list('/colors').snapshotChanges();
  }

  getAllColors() { 
    return this.db.list('/colors', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
