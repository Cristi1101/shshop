import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCulori {

  constructor(private bazaDeDate: AngularFireDatabase) { }

  primesteCulorile(){
    return this.bazaDeDate.list('/colors').snapshotChanges();
  }

  primesteToateCulorile() { 
    return this.bazaDeDate.list('/colors', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
