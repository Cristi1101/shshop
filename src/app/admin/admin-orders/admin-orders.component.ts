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
  // orders: Order[] = [];
  // subscription: Subscription;
  // tableResource: DataTableResource<Order>;
  // items: Order[] = [];
  // itemCount: number;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
    this.orders$ = orderService.getAll();

    // this.subscription = this.orderService.getAll().subscribe(orders => {
    //   this.orders = orders;
    //   this.initializeTable(orders);
    // });
   }

  // private initializeTable(users: Order[]) {
  //   this.tableResource = new DataTableResource(users);
  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }

  // filter(query: string) {
  //   let filteredUsers = (query) ?
  //     this.orders.filter(p => p.shipping.toLowerCase().includes(query.toLowerCase())) :
  //     this.orders;

  //   this.initializeTable(filteredUsers);
  // }

  // ngOnInit(): void {
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }


}
