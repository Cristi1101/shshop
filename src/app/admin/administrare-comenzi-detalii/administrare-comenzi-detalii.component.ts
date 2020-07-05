import { Component } from '@angular/core';
import { ServiciuComenzi } from '../../serviciu-comenzi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Comanda } from '../../models/comanda';
import { ServiciuStareaComenzii } from '../../serviciu-starea-comenzii.service';

@Component({
  selector: 'administrare-comenzi-detalii',
  templateUrl: './administrare-comenzi-detalii.component.html',
  styleUrls: ['./administrare-comenzi-detalii.component.css']
})
export class AdministrareComenziDetalii {
  idComanda;
  comanda;
  comanda2: Comanda[];
  stareaComenzii$;

  constructor(
    private ruta: Router,
    private rutaActiva: ActivatedRoute,
    public serviciuComenzi: ServiciuComenzi,
    private serviciuStareaComenzii: ServiciuStareaComenzii){
    this.idComanda = this.rutaActiva.snapshot.paramMap.get('id'); 

    if (this.idComanda) {
      this.serviciuComenzi.primesteComandaSpecifica(this.idComanda).pipe(take(1)).subscribe(comanda => (this.comanda = comanda));
      this.serviciuComenzi.primesteElemente(this.idComanda).pipe(take(1)).subscribe(comanda => (this.comanda2 = comanda));
    }
    this.stareaComenzii$ = serviciuStareaComenzii.primesteStareaComenzii();
  }

  inapoi(){
    this.ruta.navigate(['/administrator/comenzi']);
  }

  actualizareComanda(comanda){
    this.serviciuComenzi.actualizareComanda(this.idComanda, comanda);
    this.ruta.navigate(['/administrator/comenzi']);
  }
}
