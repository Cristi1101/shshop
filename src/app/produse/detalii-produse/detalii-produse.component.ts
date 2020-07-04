import { Component } from '@angular/core';
import { ServiciuProduse } from '../../serviciu-produse.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ServiciuCosDeCumparaturi } from '../../serviciu-cos-de-cumparaturi.service';
import { ServiciuRecenzii } from '../../serviciu-recenzii.service';
import { ServiciuUtilizatori } from '../../serviciu-utilizatori.service';

@Component({
  selector: 'detalii-produse',
  templateUrl: './detalii-produse.component.html',
  styleUrls: ['./detalii-produse.component.css']
})
export class DetaliiProduse {
  produs;
  idRuta;
  recenzii = [];

  constructor(
    private ruta: ActivatedRoute,
    private serviciuRecenzii: ServiciuRecenzii,
    private serviciuProduse: ServiciuProduse,
    private serviciuUtilizatori: ServiciuUtilizatori,
    public serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi) {
    this.idRuta = this.ruta.snapshot.paramMap.get('id');
    if (this.idRuta)
      this.serviciuProduse.toateProdusele2(this.idRuta).pipe(take(1)).subscribe(p => (this.produs = p));
    this.recenziiProdus();
  }

  recenziiProdus() {
    this.serviciuRecenzii.primesteToateRecenziile(this.idRuta).subscribe(recenziiData => {
      recenziiData.forEach(element1 => {
        this.serviciuUtilizatori.primesteUtilizator(element1.uid).subscribe(data => {
          this.recenzii.push({
            recenzie: element1,
            user: data.payload.val()
          });
        });
      })
    });
  }

  adaugaInCos() {
    if (window.confirm('Produs adăugat în coșul de cumpărături!'))
      this.serviciuCosDeCumparaturi.adaugaInCosulDeCumparaturi(this.produs.payload.val());
  }
}