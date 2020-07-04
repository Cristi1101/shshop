import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Utilizator } from './models/utilizator';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciuUtilizatori {

  constructor(
    private bazaDeDate: AngularFireDatabase,
    private ruta: Router) { }

  salveazaUtilizator(utilizator: firebase.User) {
    this.bazaDeDate.object('/users/' + utilizator.uid).update({
      name: utilizator.displayName,
      email: utilizator.email
    });
  }

  primesteTotiUtilizatorii() {
    return this.bazaDeDate.list<Utilizator>('/users')
      .snapshotChanges()
      .pipe(
        map(schimbari =>
          schimbari.map(c => {
            const data = c.payload.val() as Utilizator;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  primesteUtilizator(userId) {
    return this.bazaDeDate.object('/users/' + userId).snapshotChanges();
  }

  actualizareUtilizator(userId, user) {
    return this.bazaDeDate.object('/users/' + userId).update(user);
  }

  actualizareDateUtilizator(idUtilizator, numeUtilizator, email, prenume, nume, adresa, oras, codPostal, imagine) {
    const referintaUtilizator = this.bazaDeDate.object('/users/' + idUtilizator);
    const dateUtilizator: Utilizator = {
      username: numeUtilizator,
      email: email,
      firstName: prenume,
      lastName: nume,
      city: oras,
      address: adresa,
      postalCode: codPostal,
      img: imagine
    }
    referintaUtilizator.update(dateUtilizator);

    this.ruta.navigate(['/administrator/utilizatori']);
  }

  stergeUtilizator(idUtilizator) {
    this.bazaDeDate.object('/users/' + idUtilizator).remove();
    this.ruta.navigate(['/administrator/utilizatori']);
  }

  primesteUtilizator2(idUtilizator: string): AngularFireObject<Utilizator> {
    return this.bazaDeDate.object('/users/' + idUtilizator);
  }
}