import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  users: AppUser;
  userID = localStorage.getItem('userUID');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage)
    {
      this.authService.appUser$.subscribe(user => {
        if (user) {
          this.users = user;
          console.log("USER", user);
        }
      });

     
  }

    // uploadPercent: Observable<number>;
    // urlImage: Observable<string>;

  save(users) {
    this.userService.update(this.userID, users);
    this.router.navigate(['/my-account']);
  }


  cancel() {
    this.router.navigate(['/my-account']);
  }

  // onUpload(e) {
  //   const id = Math.random().toString(36).substring(2);
  //   const file = e.target.files[0];
  //   const filePath = 'uploads/' + id;
  //   const ref = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   this.uploadPercent = task.percentageChanges();
  //   task.snapshotChanges().pipe(
  //     finalize(() => {
  //       ref.getDownloadURL().subscribe((url) => {
  //         this.urlImage = url;
  //         console.log("url:", this.urlImage);
  //       })
  //     })
  //   ).subscribe();
  // }

  ngOnInit(): void {
  }

}
