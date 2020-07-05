import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Utilizator } from './models/utilizator';
import { ServiciuUtilizatori } from './serviciu-utilizatori.service';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class ServiciuDeAutentificare {
  utilizatorObs$: Observable<firebase.User>;
  utilizator;

  constructor(
    private serviciuUtilizatori: ServiciuUtilizatori,
    private angularFireAuth: AngularFireAuth,
    private bazaDeDate: AngularFireDatabase,
    private ruta: Router) {

    this.utilizatorObs$ = angularFireAuth.authState;
    this.angularFireAuth.authState.subscribe(utilizator => {
      if (utilizator !== undefined && utilizator !== null) {
        this.utilizator = utilizator;
        localStorage.setItem('userUID', this.utilizator.uid);
      }
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    localStorage.removeItem('userUID');
    this.ruta.navigate(['catalog-de-produse']);
  }

  autentificareUtilizator(email, parola) {
    if (email && parola)
      this.ruta.navigate(['catalog-de-produse']);
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, parola)
      .catch((error) => {
        window.alert(error.message)
      })
  }

  inregistrareUtilizatorNou(email, parola, numeUtilizator, prenume, nume, oras, adresa, codPostal, imagine) {
    this.ruta.navigate(['catalog-de-produse']);
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, parola)
      .then((rezultat) => {
        this.dateUtilizatorNou(rezultat.user, numeUtilizator, prenume, nume, oras, adresa, codPostal, imagine);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  private dateUtilizatorNou(utilizator, numeUtilizator, prenume, nume, oras, adresa, codPostal, imagine) {
    const referintaUtilizator = this.bazaDeDate.object('/users/' + utilizator.uid);
    const dateUtilizator: Utilizator = {
      username: numeUtilizator,
      email: utilizator.email,
      isAdmin: utilizator.isAdmin = false,
      firstName: prenume,
      lastName: nume,
      city: oras,
      address: adresa,
      postalCode: codPostal,
      img: imagine
    }
    referintaUtilizator.set(dateUtilizator);
  }

  get utilizator$(): Observable<Utilizator> {
    return this.utilizatorObs$
      .switchMap(user => {
        if (user) return this.serviciuUtilizatori.primesteUtilizator2(user.uid).valueChanges();

        return Observable.of(null);
      });
  }
}
