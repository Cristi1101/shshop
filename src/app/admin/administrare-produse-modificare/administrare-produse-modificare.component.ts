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
  categorii$;
  culori$;
  produs;
  idProdus;
  subcategorii$;

  constructor(
    private ruta: Router,
    private rutaActiva: ActivatedRoute,
    private serviciuCategorii: ServiciuCategorii,
    private serviciuSubcategorii: ServiciuSubcategorii,
    private serviciuCulori: ServiciuCulori,
    private serviciuProdus: ServiciuProduse) {

    this.categorii$ = serviciuCategorii.toateCategoriile();
    this.culori$ = serviciuCulori.primesteCulorile();
    this.idProdus = this.rutaActiva.snapshot.paramMap.get('id');
    this.subcategorii$ = serviciuSubcategorii.primesteSubcategoriile();

    if (this.idProdus)
      this.serviciuProdus.toateProdusele2(this.idProdus).pipe(take(1)).subscribe(produs => (this.produs = produs));
  }

  salvareProdus(produs) {
    if (this.idProdus)
      this.serviciuProdus.actualizareProdus(this.idProdus, produs);

    this.ruta.navigate(['/administrator/produs']);
  }

  stergeProdus() {
    if (!confirm('Sunteți sigur că doriți să ștergeți acest produs?')) return;

    this.serviciuProdus.stergeProdus(this.idProdus);
    this.ruta.navigate(['/administrator/produs']);
  }

  inapoi() {
    this.ruta.navigate(['/administrator/produs']);
  }
}
