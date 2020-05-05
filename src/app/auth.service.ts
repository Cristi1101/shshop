import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2'
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
user$: Observable<firebase.User>;
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

    login(){
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);

      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      return this.afAuth.auth.signInWithPopup(provider);
    }

    logout(){
      this.afAuth.auth.signOut();
    }

    signIn(email, password) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
          window.alert(error.message)
        })
    }
  
    get appUser$() : Observable<AppUser>{
      return this.user$
      .switchMap(user => {
         if (user) return this.userService.get(user.uid).valueChanges();

         return Observable.of(null);
    });
  }
}
