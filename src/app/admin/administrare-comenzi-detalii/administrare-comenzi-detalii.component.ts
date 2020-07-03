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
      this.orderService.get(this.id).pipe(take(1)).subscribe(o => (this.order = o));
      this.orderService.getItems(this.id).pipe(take(1)).subscribe(o => (this.order2 = o));
      console.log("id:", this.order);
    }
    this.orderStatus$ = orderStatusService.getOrderStatus();
  }

  back(){
    this.router.navigate(['/admin/orders']);
  }

  update(order){
    this.orderService.updateOrder(this.id, order);
    this.router.navigate(['/admin/orders']);
  }
}
