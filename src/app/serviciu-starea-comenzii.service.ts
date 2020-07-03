import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiciuStareaComenzii {

  constructor(private bazaDeDate: AngularFireDatabase) { }

  primesteStareaComenzii(){
    return this.bazaDeDate.list('/orderStatus').snapshotChanges();
  }
}
