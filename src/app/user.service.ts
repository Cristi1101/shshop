import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
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
