import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  user: AppUser;
  imageSrc;
  selectedImage: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) {
    this.authService.appUser$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  edit() {
    this.router.navigate(['/edit-account']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}