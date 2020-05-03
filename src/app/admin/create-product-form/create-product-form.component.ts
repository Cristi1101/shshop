import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { ColorsService } from 'src/app/colors.service';
import { Router } from '@angular/router';
import { SubcategoriesService } from 'src/app/subcategories.service';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css']
})
export class CreateProductFormComponent implements OnInit {
  categories$;
  subcategories$;
  colors$;
  subcategories1;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoriesService, 
    private colorsService: ColorsService,
    private createProductService: ProductService) {

    this.categories$ = categoryService.getCategories();
    this.subcategories$ = subcategoryService.getSubcategories();
    this.colors$ = colorsService.getColors();

    subcategoryService.getSubcategories().subscribe(data => {
      this.subcategories1 = data;
    });
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

  orice(param){
    console.log("option:", param);
    
  }

  filteredSubcategories(param){
    return this.subcategories1.filter(x => x.payload.val().parentId == param);
  }
}
