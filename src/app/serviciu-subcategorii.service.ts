import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuSubcategorii {

  constructor(private bazaDeDate: AngularFireDatabase) { }

  primesteSubcategoriile() {
    return this.bazaDeDate.list('/subcategories').snapshotChanges();
  }
}
