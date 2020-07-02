import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})

export class EditAccountComponent {
  users: AppUser;
  userID = localStorage.getItem('userUID');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage) {
    this.authService.appUser$.subscribe(user => {
      if (user) {
        this.users = user;
      }
    });
  }

  save(users) {
    this.userService.update(this.userID, users);
    this.router.navigate(['/my-account']);
  }

  cancel() {
    this.router.navigate(['/my-account']);
  }
}