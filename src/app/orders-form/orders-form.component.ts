import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../models/order';
import { OrderStatusService } from '../order-status.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent {
  id;
  order;
  order2: Order[];
  orderStatus$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderService: OrderService,
    private orderStatusService: OrderStatusService){
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
