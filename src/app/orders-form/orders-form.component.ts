import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../models/order';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {
  id;
  order;
  order2: Order[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderService: OrderService){
    this.id = this.route.snapshot.paramMap.get('id'); 

    if (this.id) {
      this.orderService.get(this.id).pipe(take(1)).subscribe(o => (this.order = o));
      this.orderService.getItems(this.id).pipe(take(1)).subscribe(o => (this.order2 = o));
      console.log("id:", this.order);
    }
    
    }

  back(){
    this.router.navigate(['/admin/orders']);
  }

  ngOnInit(): void {
  }

}
