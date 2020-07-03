import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ServiciuRecenzii } from '../../serviciu-recenzii.service';

@Component({
  selector: 'recenziile-mele-verificare',
  templateUrl: './recenziile-mele-verificare.component.html',
  styleUrls: ['./recenziile-mele-verificare.component.css']
})
export class RecenziileMeleModificare implements OnInit {
  state;

  constructor(
    private router: Router,
    public recenziiService: ServiciuRecenzii) {
    this.state = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    ).subscribe(object => {
      this.state = object;
    });
  }
}