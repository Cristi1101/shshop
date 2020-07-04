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
  categorii$;
  subcategorii$;
  culori$;
  subcategorii;

  constructor(
    private ruta: Router,
    private serviciuCategorii: ServiciuCategorii,
    private serviciuSubcategorii: ServiciuSubcategorii,
    private serviciuCulori: ServiciuCulori,
    private serviciuProduse: ServiciuProduse) {

    this.categorii$ = serviciuCategorii.getCategories();
    this.subcategorii$ = serviciuSubcategorii.primesteSubcategoriile();
    this.culori$ = serviciuCulori.primesteCulorile();

    serviciuSubcategorii.primesteSubcategoriile().subscribe(date => {
      this.subcategorii = date;
    });
  }

  salveazaProdus(produs) {
    this.serviciuProduse.creareProdus(produs);

    this.ruta.navigate(['/administrator/produs']);
  }

  inapoi() {
    this.ruta.navigate(['/administrator/produs']);
  }

  ngOnInit(): void {
  }

  subcategoriiFiltrate(parametrii) {
    return this.subcategorii.filter(subcategorii => subcategorii.payload.val().parentId == parametrii);
  }
}