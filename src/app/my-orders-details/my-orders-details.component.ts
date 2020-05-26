import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { take } from 'rxjs/operators';
import { Order } from '../models/order';
import { RecenziiService } from '../recenzii.service';

@Component({
  selector: 'app-my-orders-details',
  templateUrl: './my-orders-details.component.html',
  styleUrls: ['./my-orders-details.component.css']
})
export class MyOrdersDetailsComponent implements OnInit {
 
  id;
  order;
  order2: Order[];
  currentRate = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private recenziiService: RecenziiService){
    this.id = this.route.snapshot.paramMap.get('id'); 

    if (this.id) {
      this.orderService.get(this.id).pipe(take(1)).subscribe(o => (this.order = o));
      this.orderService.getItems(this.id).pipe(take(1)).subscribe(o => (this.order2 = o));
      console.log("id:", this.order);
    }
    
  }

  adaugaRecenzie(recenzie: string, product, stele){
    console.log("recenzie:", product.key);
    let modelRecenzie = {
      stele: stele,
      continut: recenzie,
      uid: localStorage.getItem("userUID"),
    };
    this.recenziiService.create(modelRecenzie, product.key);
  }

  back(){
    this.router.navigate(['/my-orders']);
  } 

  ngOnInit(): void {
  }

}
