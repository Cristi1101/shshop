import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// var admin = require('firebase-admin');
// var serviceAccount = require('./shshop-2dd1a-firebase-adminsdk-fy8rc-3353ba58ef.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(
    private db: AngularFireDatabase,
    private router: Router
    ) { }

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
    return this.db.object('/users/' + userId).snapshotChanges(); 
  }

  update(userId, user){
    return this.db.object('/users/' + userId).update(user);
  }

  updateUser(userId, username, email, firstname, lastname, address, city, postalcode, image){
    const userRef = this.db.object('/users/' + userId);
    const userData: AppUser = {
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

  
  delete(userId){
    // return admin.auth().deleteUser(userId).then(function() {
    this.db.object('/users/' + userId).remove();
      
    //   console.log('Successfully deleted user');
    // })
    // .catch(function(error) {
    //   console.log('Error deleting user:', error);
    // }); 
    this.router.navigate(['/admin/users']);
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
