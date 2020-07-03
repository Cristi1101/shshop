import { Component } from '@angular/core';
import { ServiciuComenzi } from 'src/app/serviciu-comenzi.service';
import { Comanda } from 'src/app/models/comanda';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';
import { Utilizator } from 'src/app/models/utilizator';
import { ServiciuUtilizatori } from 'src/app/serviciu-utilizatori.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'administrare-comenzi',
  templateUrl: './administrare-comenzi.component.html',
  styleUrls: ['./administrare-comenzi.component.css']
})
export class AdministrareComenzi {
  orders$;

  constructor(
    private orderService: ServiciuComenzi,
    private router: Router,
    private route: ActivatedRoute) {
    this.orders$ = orderService.primesteToateComenzile();
  }
}