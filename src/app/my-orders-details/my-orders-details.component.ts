import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { take } from 'rxjs/operators';
import { Order } from '../models/order';

@Component({
  selector: 'app-my-orders-details',
  templateUrl: './my-orders-details.component.html',
  styleUrls: ['./my-orders-details.component.css']
})
export class MyOrdersDetailsComponent implements OnInit {
 
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
    this.router.navigate(['/my-orders']);
  } 

  ngOnInit(): void {
  }

}
