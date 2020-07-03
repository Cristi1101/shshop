import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCategorii {

  constructor(private bazaDeDate: AngularFireDatabase) { }

  getCategories(){
    return this.bazaDeDate.list('/categories').snapshotChanges();
  }

  toateCategoriile() { 
    return this.bazaDeDate.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
