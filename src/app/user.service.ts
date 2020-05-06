import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getAll() {
    return this.db.list<AppUser>('/users')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as AppUser;
                    const key = c.payload.key;
                    return { key, ...data };
                })
            )
        );
  }

  getUser(userId) {
    return this.db.object('/users/' + userId).valueChanges();
  }

  update(userId, user){
    return this.db.object('/users/' + userId).update(user);
  }

  delete(userId){
    return this.db.object('/users/' + userId).remove();
  }
  // create(user: firebase.User){
  //   this.db.object('/users/' + user.uid).set({
  //     name: user.displayName,
  //     email: user.email,
  //   });
  // }

  // create(user: any) {
  //   return new Promise((resolve, reject) => {
  //     if(user.uid) {
  //       this.db.list('/users/' + user.uid)
  //             .update(user.uid, ({ name: user.name }))
  //             .then(() => resolve())
  //             .catch((e) => reject(e))
  //     } else {
  //       this.db.list('/users/' + user.uid)
  //               .push({ name: user.name })
  //               .then(() => resolve())
  //       }
  //     })
  //   }
  get(uid: string): AngularFireObject<AppUser>{
      return this.db.object('/users/' + uid);
  }
}
