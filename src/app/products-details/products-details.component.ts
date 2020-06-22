import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent {

  checked: boolean;
  product;
  id;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public cartService: ShoppingCartService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).pipe(take(1)).subscribe(p => (this.product = p));
  }

  addToCart(){
    if(window.confirm('Product added to shopping-cart!'))
      this.cartService.addToCart(this.product.payload.val());
  }
}
