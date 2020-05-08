import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2'
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router) {
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
      if (email && password)
        this.router.navigate(['/']);
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
          window.alert(error.message)
        })
        
    }

    // signUp(email, password, ) {
    //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    //     .then((result) => {
    //       window.alert("You have been successfully registered!");
    //       console.log(result.user)
    //     }).catch((error) => {
    //       window.alert(error.message)
    //     })
  //   // }
  
    signUp(email, password, username, name, lastname, city, address, postalcode) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          // this.SendVerificationMail();
          this.writeNewUser(result.user, username, name, lastname, city, address, postalcode);
      }).catch((error) => {
          window.alert(error.message)
      })
  }

  
  private writeNewUser(user, username, name, lastname, city, address, postalcode) {

    const userRef = this.db.object('/users/' + user.uid);
    const userData: AppUser = {
      username: username,
      email: user.email,
      isAdmin: user.isAdmin = false,
      firstName: name,
      lastName: lastname,
      city: city,
      address: address,
      postalCode: postalcode
    }
    userRef.set(userData);
  }

    get appUser$() : Observable<AppUser>{
      return this.user$
      .switchMap(user => {
         if (user) return this.userService.get(user.uid).valueChanges();

         return Observable.of(null);
    });
  }
}
