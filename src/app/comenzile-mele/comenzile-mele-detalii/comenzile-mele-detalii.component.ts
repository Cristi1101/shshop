import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciuComenzi } from '../../serviciu-comenzi.service';
import { take } from 'rxjs/operators';
import { Comanda } from '../../models/comanda';
import { ServiciuRecenzii } from '../../serviciu-recenzii.service';
import { ServiciuStareaComenzii } from '../../serviciu-starea-comenzii.service';

@Component({
  selector: 'comenzile-mele-detalii',
  templateUrl: './comenzile-mele-detalii.component.html',
  styleUrls: ['./comenzile-mele-detalii.component.css']
})
export class ComenzileMeleDetalii {

  idComanda;
  comanda;
  comanda2: Comanda[];
  evaluari = [0];
  recenzii$;
  idUtilizator = localStorage.getItem('userUID');

  constructor(
    private ruta: Router,
    private rutaActiva: ActivatedRoute,
    private serviciuComenzi: ServiciuComenzi,
    private serviciuRecenzii: ServiciuRecenzii,) {
    this.idComanda = this.rutaActiva.snapshot.paramMap.get('id');

    if (this.idComanda) {
      this.serviciuComenzi.primesteComandaSpecifica(this.idComanda).pipe(take(1)).subscribe(comanda => (this.comanda = comanda));
      this.serviciuComenzi.primesteElemente(this.idComanda).pipe(take(1)).subscribe(comanda2 => {
        this.comanda2 = comanda2;
        this.evaluari = new Array(this.comanda2.length);
        for (let i = 0; i < this.comanda2.length; i++) {
          this.evaluari[i] = 0;
        }
      });
    }
  }

  adaugaRecenzie(recenzie: string, produs, stele) {
    let modelRecenzie = {
      stele: stele,
      continut: recenzie,
      uid: localStorage.getItem("userUID")
    };
    this.serviciuRecenzii.creareRecenzie(modelRecenzie, produs.key);
  }

  afisareRecenzie(produs) {
    this.recenzii$ = this.serviciuRecenzii.primesteRecenziile(produs.key);
  }

  inapoi() {
    this.ruta.navigate(['/my-orders']);
  }
}