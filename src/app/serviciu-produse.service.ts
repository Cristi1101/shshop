import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Produs } from './models/produs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciuProduse {
  constructor(
    private ruta: Router,
    private bazaDeDate: AngularFireDatabase) { }

  creareProdus(produs) {
    return this.bazaDeDate.list('/produse').push(produs);
  }

  celeMaiVizitateProduse() {
    return this.bazaDeDate.list('/produse',
      ref => ref.orderByChild('vizite').limitToLast(5)).valueChanges();
  }

  ultimeleProduseVizitate() {
    return this.bazaDeDate.list('/produse',
      ref => ref.orderByChild('ultimaAccesare').limitToLast(5)).valueChanges();
  }

  toateProdusele() {
    return this.bazaDeDate.list<Produs>('/produse', ref => ref.orderByChild('pret'))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Produs;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  obtineProdus(idProdus) {
    return this.bazaDeDate.object('/produse/' + idProdus).snapshotChanges();
  }

  actualizareProdus(idProdus, produs) {
    return this.bazaDeDate.object('/produse/' + idProdus).update(produs);
  }

  creareProduse(numeProdus, descriere, pret, categorie, subcategorie, culoare, imagine) {
    const referintaProdus = this.bazaDeDate.list('/produse');
    const dateProdus: Produs = {
      numeProdus: numeProdus,
      pret: pret,
      categorie: categorie,
      subcategorie: subcategorie,
      culoare: culoare,
      imagine: imagine,
      descriere: descriere
    }
    referintaProdus.push(dateProdus);
    this.ruta.navigate(['/administrator/produs']);
  }

  stergeProdus(idProdus) {
    return this.bazaDeDate.object('/produse/' + idProdus).remove();
  }
}
