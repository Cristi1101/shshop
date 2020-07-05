
import { AngularFireDatabase } from 'angularfire2/database';
import { Produs } from './models/produs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciuFavorite {
  idUtilizator = localStorage.getItem('userUID');
  constructor(private bazaDeDate: AngularFireDatabase) { }

  private creazaListaProduseFavorite() {
    return this.bazaDeDate.list('/favorite').push({
      dateCreated: new Date().getTime(),
      userId: this.idUtilizator
    });
  }

  async primesteListaProduselorFavorite() {
    return this.bazaDeDate.object('/favorite/' + this.idUtilizator);
  }

  primesteProduseFavorite() {
    return this.bazaDeDate.list('/favorite/' + this.idUtilizator + "/elemente").snapshotChanges();
  }

  primesteProdusFavorit(idListaFavorite: string, idProdus: string) {
    return this.bazaDeDate.object('/favorite/' + idListaFavorite + '/elemente/' + idProdus);
  }

  async adaugaProdusFavorit(produs: Produs) {

    this.actualizeazaFavorite(produs, true);
  }

  async stergeProdusFavorit(produs: Produs) {
    this.actualizeazaFavorite(produs, false);
    window.location.reload();
  }

  validareFavorite(idProdus: string): Observable<any> {
    return this.bazaDeDate.object('/favorite/' + this.idUtilizator + '/elemente/' + idProdus).valueChanges();
  }

  async sterge() {
    this.bazaDeDate.object('/favorite/' + this.idUtilizator + '/elemente').remove();
  }

  private async actualizeazaFavorite(produs: Produs, deAdaugat: boolean) {
    if (deAdaugat == true) {
      let element = this.primesteProdusFavorit(this.idUtilizator, produs.key);
      element.snapshotChanges().pipe(take(1)).subscribe((date) => {
        element.update({ produs: produs });
      });
    }
    else {
      this.bazaDeDate.object('/favorite/' + this.idUtilizator + '/elemente/' + produs.key).remove();
    }
  }
}
