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
  id;
  order;
  order2: Comanda[];
  orderStatus$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderService: ServiciuComenzi,
    private orderStatusService: ServiciuStareaComenzii){
    this.id = this.route.snapshot.paramMap.get('id'); 

    if (this.id) {
      this.orderService.primesteComandaSpecifica(this.id).pipe(take(1)).subscribe(o => (this.order = o));
      this.orderService.primesteElemente(this.id).pipe(take(1)).subscribe(o => (this.order2 = o));
      console.log("id:", this.order);
    }
    this.orderStatus$ = orderStatusService.primesteStareaComenzii();
  }

  back(){
    this.router.navigate(['/administrator/comenzi']);
  }

  update(order){
    this.orderService.actualizareComanda(this.id, order);
    this.router.navigate(['/administrator/comenzi']);
  }
}
