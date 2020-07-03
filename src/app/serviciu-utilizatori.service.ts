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
    private db: AngularFireDatabase,
    private router: Router) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getAll() {
    return this.db.list<Utilizator>('/users')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Utilizator;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  getUser(userId) {
    return this.db.object('/users/' + userId).snapshotChanges();
  }

  update(userId, user) {
    return this.db.object('/users/' + userId).update(user);
  }

  updateUser(userId, username, email, firstname, lastname, address, city, postalcode, image) {
    const userRef = this.db.object('/users/' + userId);
    const userData: Utilizator = {
      username: username,
      email: email,
      firstName: firstname,
      lastName: lastname,
      city: city,
      address: address,
      postalCode: postalcode,
      img: image
    }
    userRef.update(userData);

    this.router.navigate(['/admin/users']);
  }

  delete(userId) {
    this.db.object('/users/' + userId).remove();
    this.router.navigate(['/admin/users']);
  }

  get(uid: string): AngularFireObject<Utilizator> {
    return this.db.object('/users/' + uid);
  }
}