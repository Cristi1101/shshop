import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';

@Component({
  selector: 'contul-meu',
  templateUrl: './contul-meu.component.html',
  styleUrls: ['./contul-meu.component.css']
})
export class ContulMeu {
  user: Utilizator;
  imageSrc;
  selectedImage: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: ServiciuDeAutentificare) {
    this.authService.utilizator$.subscribe(user => {
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