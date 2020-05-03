import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ColorsService } from 'src/app/colors.service';
import { SubcategoriesService } from 'src/app/subcategories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  colors$;
  product;
  id;
  subcategories$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoriesService,
    private colorService: ColorsService, 
    private productService: ProductService) { 

    this.categories$ = categoryService.getAll();
    this.colors$ = colorService.getColors();
    this.id = this.route.snapshot.paramMap.get('id');
    this.subcategories$ = subcategoryService.getSubcategories();
    // subcategoryService.getSubcategories().subscribe(data => {
    //   this.subcategories$data;
    // });

    if (this.id) 
      this.productService.get(this.id).pipe(take(1)).subscribe(p => (this.product = p));
  }

  save(product){
    if(this.id) 
      this.productService.update(this.id, product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  cancel(){
    this.router.navigate(['/admin/products']);
  }

  filteredSubcategories(param){
    return this.subcategories$.filter(x => x.payload.val().parentId == param);
  }

  ngOnInit(): void {
  }
}
