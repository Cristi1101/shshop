import { Component } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/models/order';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from 'src/app/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
    this.orders$ = orderService.getAll();
  }
}