import { Component } from '@angular/core';
import { Utilizator } from '../models/utilizator';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'contul-meu-modificari',
  templateUrl: './contul-meu-modificari.component.html',
  styleUrls: ['./contul-meu-modificari.component.css']
})

export class ContulMeuModificari {
  users: Utilizator;
  userID = localStorage.getItem('userUID');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: ServiciuDeAutentificare,
    private userService: ServiciuUtilizatori,
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