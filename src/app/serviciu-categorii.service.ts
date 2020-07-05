import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCategorii {

  constructor(private bazaDeDate: AngularFireDatabase) { }

  toateCategoriile() { 
    return this.bazaDeDate.list('/categorii', ref => ref.orderByChild('nume')).snapshotChanges();
  }
}
