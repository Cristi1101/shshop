import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { take } from 'rxjs/operators';
import { Order } from '../models/order';
import { RecenziiService } from '../recenzii.service';
import { OrderStatusService } from '../order-status.service';

@Component({
  selector: 'app-my-orders-details',
  templateUrl: './my-orders-details.component.html',
  styleUrls: ['./my-orders-details.component.css']
})
export class MyOrdersDetailsComponent {

  id;
  order;
  order2: Order[];
  currentRates = [0];
  recenzii$;
  userID = localStorage.getItem('userUID');
  orderStatus$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private recenziiService: RecenziiService,
    private orderStatusService: OrderStatusService) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.orderService.get(this.id).pipe(take(1)).subscribe(o => (this.order = o));
      this.orderService.getItems(this.id).pipe(take(1)).subscribe(o => {
        this.order2 = o;
        this.currentRates = new Array(this.order2.length);
        for (let i = 0; i < this.order2.length; i++) {
          this.currentRates[i] = 0;
        }
      });
    }
    this.orderStatus$ = orderStatusService.getOrderStatus();
  }

  adaugaRecenzie(recenzie: string, product, stele) {
    let modelRecenzie = {
      stele: stele,
      continut: recenzie,
      uid: localStorage.getItem("userUID")
    };
    this.recenziiService.create(modelRecenzie, product.key);
  }

  afisareRecenzie(product) {
    this.recenzii$ = this.recenziiService.getAll(product.key);
  }

  back() {
    this.router.navigate(['/my-orders']);
  }
}