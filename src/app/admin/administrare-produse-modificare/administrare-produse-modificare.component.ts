import { Component } from '@angular/core';
import { ServiciuCategorii } from 'src/app/serviciu-categorii.service';
import { ServiciuProduse } from 'src/app/serviciu-produse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ServiciuCulori } from 'src/app/serviciu-culori.service';
import { ServiciuSubcategorii } from 'src/app/serviciu-subcategorii.service';

@Component({
  selector: 'administrare-produse-modificare',
  templateUrl: './administrare-produse-modificare.component.html',
  styleUrls: ['./administrare-produse-modificare.component.css']
})
export class AdministrareProduseModificare {
  categories$;
  colors$;
  product;
  id;
  subcategories$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: ServiciuCategorii,
    private subcategoryService: ServiciuSubcategorii,
    private colorService: ServiciuCulori,
    private productService: ServiciuProduse) {
      
    this.categories$ = categoryService.toateCategoriile();
    this.colors$ = colorService.primesteCulorile();
    this.id = this.route.snapshot.paramMap.get('id');
    this.subcategories$ = subcategoryService.primesteSubcategoriile();

    if (this.id)
      this.productService.toateProdusele2(this.id).pipe(take(1)).subscribe(p => (this.product = p));
  }

  save(product) {
    if (this.id)
      this.productService.actualizareProdus(this.id, product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.stergeProdus(this.id);
    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  filteredSubcategories(param) {
    return this.subcategories$.filter(x => x.payload.val().parentId == param);
  }
}
