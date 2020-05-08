import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { read } from 'fs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: AppUser;
  imageSrc; 
  selectedImage: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) {
      this.authService.appUser$.subscribe(user => {
        if(user){
          this.user = user;
          console.log("USER", user);
        }
      });
    }
  
  ngOnInit(): void {}

  swhoPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imageSrc = '';
      this.selectedImage = null;
    }
  }
}
