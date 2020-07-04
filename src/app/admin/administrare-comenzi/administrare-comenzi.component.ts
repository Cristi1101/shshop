import { Component } from '@angular/core';
import { ServiciuComenzi } from 'src/app/serviciu-comenzi.service';

@Component({
  selector: 'administrare-comenzi',
  templateUrl: './administrare-comenzi.component.html',
  styleUrls: ['./administrare-comenzi.component.css']
})
export class AdministrareComenzi {
  comenzi$;

  constructor(
    private serviciuComenzi: ServiciuComenzi) {
    this.comenzi$ = serviciuComenzi.primesteToateComenzile();
  }
}