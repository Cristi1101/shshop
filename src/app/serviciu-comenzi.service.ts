import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServiciuCosDeCumparaturi } from './serviciu-cos-de-cumparaturi.service';
import { Comanda } from './models/comanda';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciuComenzi {

  constructor(
    private bazaDeDate: AngularFireDatabase,
    private serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi) { }

  async plaseazaComanda(comanda) {
    let rezultat = await this.bazaDeDate.list('/comenzi').push(comanda);
    this.serviciuCosDeCumparaturi.stergeCosulDeCumparaturi();
    return rezultat;
  }

  primesteComandaSpecifica(idComanda) {
    return this.bazaDeDate.object('/comenzi/' + idComanda).snapshotChanges();
  }

  primesteElemente(idComanda) {
    return this.bazaDeDate.list<Comanda>('/comenzi/' + idComanda + '/produse/').snapshotChanges().pipe(
      map(schimbari =>
        schimbari.map(c => {
          const data = c.payload.val() as Comanda;
          const key = c.payload.key;
          return { key, ...data };
        })
      )
    );
  }

  primesteComenzile() {
    return this.bazaDeDate.list('/comenzi').snapshotChanges();
  }

  primesteToateComenzile() {
    return this.bazaDeDate.list<Comanda>('/comenzi')
      .snapshotChanges()
      .pipe(
        map(schimbari =>
          schimbari.map(c => {
            const data = c.payload.val() as Comanda;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  primesteComenzileUtilizatorului(idUtilizator: string) {
    return this.bazaDeDate.list<Comanda>('/comenzi', ref => ref.orderByChild('idUtilizator').equalTo(idUtilizator))
      .snapshotChanges()
      .pipe(
        map(schimbari =>
          schimbari.map(c => {
            const data = c.payload.val() as Comanda;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  actualizareComanda(idComanda, comanda) {
    return this.bazaDeDate.object('/comenzi/' + idComanda).update(comanda);
  }
}
