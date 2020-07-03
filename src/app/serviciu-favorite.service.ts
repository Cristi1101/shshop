import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Produs } from './models/produs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciuFavorite {
  idUtilizator = localStorage.getItem('userUID');
  constructor(private bazaDeDate: AngularFireDatabase) { }

  private creazaListaProduseFavorite() {
    return this.bazaDeDate.list('/favorites').push({
      dateCreated: new Date().getTime(),
      userId: this.idUtilizator
    });
  }

  async primesteListaProduselorFavorite() {
    return this.bazaDeDate.object('/favorites/' + this.idUtilizator);
  }

  primesteProduseFavorite() {
    return this.bazaDeDate.list('/favorites/' + this.idUtilizator + "/items").snapshotChanges();
  }

  primesteProdusFavorit(idListaFavorite: string, idProdus: string) {
    return this.bazaDeDate.object('/favorites/' + idListaFavorite + '/items/' + idProdus);
  }

  async adaugaProdusFavorit(produs: Produs) {

    this.actualizeazaFavorite(produs, true);
  }

  async stergeProdusFavorit(produs: Produs) {
    this.actualizeazaFavorite(produs, false);
    window.location.reload();
  }

  validareFavorite(idProdus: string): Observable<any> {
    return this.bazaDeDate.object('/favorites/' + this.idUtilizator + '/items/' + idProdus).valueChanges();
  }

  async sterge() {
    this.bazaDeDate.object('/favorites/' + this.idUtilizator + '/items').remove();
  }

  private async actualizeazaFavorite(produs: Produs, deAdaugat: boolean) {
    if (deAdaugat == true) {
      let item = this.primesteProdusFavorit(this.idUtilizator, produs.key);
      item.snapshotChanges().pipe(take(1)).subscribe((data) => {
        item.update({ product: produs });
      });
    }
    else {
      this.bazaDeDate.object('/favorites/' + this.idUtilizator + '/items/' + produs.key).remove();
    }
  }
}
