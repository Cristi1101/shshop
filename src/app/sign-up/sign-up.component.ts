import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private afAuth: AngularFireAuth) { }

// signUp(user$) {
//   return this.afAuth.auth.createUserWithEmailAndPassword(user$.email, user$.password)
//     .then(() => {
//         /* Call the SendVerificaitonMail() function when new user sign 
//         up and returns promise */
//         // this.SendVerificationMail();
//         this.writeNewUser(user$);
//     }).catch((error) => {
//         window.alert(error.message)
//     })
// }

// private writeNewUser(user$) {
//     this.userService.save(user$);
//   }


  // signUpForm: FormGroup = this.formBuilder.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required]],
  //   displayName: ['', [Validators.required]],
  //   firstName: ['', [Validators.required]],
  //    lastName: ['', [Validators.required]]
    //addressOne: ['', [Validators.required]]
    // addressTwo: [''],
    // zipCode: ['', [Validators.required]],
    // city: ['', [Validators.required]],
    // phoneOne: ['', [Validators.required]],
    // phoneTwo: [''],
    // profilType: ['', [Validators.required]]
  // });

  // signUpViaEmail() {
  //   this.auth.signUp(this.signUpForm.value);
  // }
  ngOnInit(): void {
  }

}
