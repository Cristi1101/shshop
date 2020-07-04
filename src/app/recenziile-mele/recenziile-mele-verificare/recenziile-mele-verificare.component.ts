import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
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
    private ruta: Router,
    public serviciuRecenzii: ServiciuRecenzii) {
    this.state = this.ruta.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.ruta.events.pipe(
      filter(eveniment => eveniment instanceof NavigationStart),
      map(() => this.ruta.getCurrentNavigation().extras.state)
    ).subscribe(object => {
      this.state = object;
    });
  }
}