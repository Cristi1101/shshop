import { Component } from '@angular/core';
import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';
import { Router } from '@angular/router';
import { ServiciuUtilizatori } from './serviciu-utilizatori.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: ServiciuUtilizatori, private auth:ServiciuDeAutentificare, router: Router){
    auth.user$.subscribe(user => {
      if(!user) return;
      
      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}