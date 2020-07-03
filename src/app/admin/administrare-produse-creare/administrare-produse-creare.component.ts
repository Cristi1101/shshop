import { Component, OnInit } from '@angular/core';
import { ServiciuCategorii } from 'src/app/serviciu-categorii.service';
import { ServiciuProduse } from 'src/app/serviciu-produse.service';
import { ServiciuCulori } from 'src/app/serviciu-culori.service';
import { Router } from '@angular/router';
import { ServiciuSubcategorii } from 'src/app/serviciu-subcategorii.service';

@Component({
  selector: 'administrare-produse-creare',
  templateUrl: './administrare-produse-creare.component.html',
  styleUrls: ['./administrare-produse-creare.component.css']
})
export class AdministrareProduseCreare implements OnInit {
  categories$;
  subcategories$;
  colors$;
  subcategories1;

  constructor(
    private router: Router,
    private categoryService: ServiciuCategorii,
    private subcategoryService: ServiciuSubcategorii,
    private colorsService: ServiciuCulori,
    private createProductService: ServiciuProduse) {

    this.categories$ = categoryService.getCategories();
    this.subcategories$ = subcategoryService.primesteSubcategoriile();
    this.colors$ = colorsService.primesteCulorile();

    subcategoryService.primesteSubcategoriile().subscribe(data => {
      this.subcategories1 = data;
    });
  }

  save(product) {
    this.createProductService.creareProdus(product);

    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

  filteredSubcategories(param) {
    return this.subcategories1.filter(x => x.payload.val().parentId == param);
  }
}