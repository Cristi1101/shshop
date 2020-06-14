import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  userID = localStorage.getItem('userUID');
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.orders$ = this.orderService.getUserOrders(this.userID);
     }

  back(){
    this.router.navigate(['/']);
  } 
  ngOnInit(): void {
  }

}
