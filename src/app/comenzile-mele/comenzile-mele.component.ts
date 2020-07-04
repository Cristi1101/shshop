import { Component } from '@angular/core';
import { ServiciuComenzi } from '../serviciu-comenzi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comenzile-mele',
  templateUrl: './comenzile-mele.component.html',
  styleUrls: ['./comenzile-mele.component.css']
})
export class ComenzileMele {
  comenzi$;
  idUtilizator = localStorage.getItem('userUID');
  
  constructor(
    private serviciuComenzi: ServiciuComenzi,
    private ruta: Router) {
    this.comenzi$ = this.serviciuComenzi.primesteComenzileUtilizatorului(this.idUtilizator);
  }

  inapoi() {
    this.ruta.navigate(['/']);
  }
}
