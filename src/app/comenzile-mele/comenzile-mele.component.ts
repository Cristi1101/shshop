import { Component } from '@angular/core';
import { ServiciuComenzi } from '../serviciu-comenzi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comenzile-mele',
  templateUrl: './comenzile-mele.component.html',
  styleUrls: ['./comenzile-mele.component.css']
})
export class ComenzileMele {
  orders$;
  userID = localStorage.getItem('userUID');
  
  constructor(
    private orderService: ServiciuComenzi,
    private router: Router,
    private route: ActivatedRoute) {
    this.orders$ = this.orderService.getUserOrders(this.userID);
  }

  back() {
    this.router.navigate(['/']);
  }
}
