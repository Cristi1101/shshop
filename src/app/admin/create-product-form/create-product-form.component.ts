import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css']
})
export class CreateProductFormComponent implements OnInit {
  categories$;

  constructor(
    private router: Router,
    private categoryService: CategoryService, 
    private createProductService: ProductService) {
    this.categories$ = categoryService.getCategories();
  }

  save(product){
    this.createProductService.create(product);

    this.router.navigate(['/admin/products']);
  }

  cancel(){
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
