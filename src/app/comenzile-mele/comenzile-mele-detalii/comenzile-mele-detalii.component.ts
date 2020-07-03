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

  id;
  order;
  order2: Comanda[];
  currentRates = [0];
  recenzii$;
  userID = localStorage.getItem('userUID');
  orderStatus$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: ServiciuComenzi,
    private recenziiService: ServiciuRecenzii,
    private orderStatusService: ServiciuStareaComenzii) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.orderService.primesteComandaSpecifica(this.id).pipe(take(1)).subscribe(o => (this.order = o));
      this.orderService.primesteElemente(this.id).pipe(take(1)).subscribe(o => {
        this.order2 = o;
        this.currentRates = new Array(this.order2.length);
        for (let i = 0; i < this.order2.length; i++) {
          this.currentRates[i] = 0;
        }
      });
    }
    this.orderStatus$ = orderStatusService.primesteStareaComenzii();
  }

  adaugaRecenzie(recenzie: string, product, stele) {
    let modelRecenzie = {
      stele: stele,
      continut: recenzie,
      uid: localStorage.getItem("userUID")
    };
    this.recenziiService.creareRecenzie(modelRecenzie, product.key);
  }

  afisareRecenzie(product) {
    this.recenzii$ = this.recenziiService.primesteRecenziile(product.key);
  }

  back() {
    this.router.navigate(['/my-orders']);
  }
}