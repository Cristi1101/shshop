import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostVisitedProducts = [];
  lastVisitedProducts = [];

  selectedIndex = 0;
  selectedIndex1 = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.productService.getMostVisitedProducts().subscribe(data => {
      let aux;
      for (let i = 0; i < data.length / 2; i++) {
        aux = data[i];
        data[i] = data[data.length - i - 1];
        data[data.length - i - 1] = aux;
      }

      this.mostVisitedProducts = data;
    });

    this.productService.getLastVisitedProducts().subscribe(data => {
      let aux;
      for (let i = 0; i < data.length / 2; i++) {
        aux = data[i];
        data[i] = data[data.length - i - 1];
        data[data.length - i - 1] = aux;
      }
      this.lastVisitedProducts = data;
    });
  }
}
