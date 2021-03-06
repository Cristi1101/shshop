import { Component } from '@angular/core';
import { ServiciuCategorii } from 'src/app/serviciu-categorii.service';
import { ServiciuProduse } from 'src/app/serviciu-produse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ServiciuCulori } from 'src/app/serviciu-culori.service';
import { ServiciuSubcategorii } from 'src/app/serviciu-subcategorii.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Produs } from 'src/app/models/produs';

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
  uploadPercent: Observable<number>;

  constructor(
    private ruta: Router,
    private rutaActiva: ActivatedRoute,
    private serviciuCategorii: ServiciuCategorii,
    private serviciuSubcategorii: ServiciuSubcategorii,
    private serviciuCulori: ServiciuCulori,
    private serviciuProdus: ServiciuProduse,
    private stocare: AngularFireStorage) {

    this.categorii$ = serviciuCategorii.toateCategoriile();
    this.culori$ = serviciuCulori.primesteCulorile();
    this.idProdus = this.rutaActiva.snapshot.paramMap.get('id');
    this.subcategorii$ = serviciuSubcategorii.primesteSubcategoriile();

    if (this.idProdus)
      this.serviciuProdus.obtineProdus(this.idProdus).pipe(take(1)).subscribe(produs => (this.produs = produs));
  }

  incarcareImagine(eveniment) {
    const idImagine = Math.random().toString(36).substring(2);
    const fisierul = eveniment.target.files[0];
    const caleaFisierului = 'uploads/' + idImagine;
    const referinta = this.stocare.ref(caleaFisierului);
    const imagine = this.stocare.upload(caleaFisierului, fisierul);
    this.uploadPercent = imagine.percentageChanges();
    imagine.snapshotChanges().pipe(
      finalize(() => {
        referinta.getDownloadURL().subscribe((urlImagine) => {
          this.produs.imagine = urlImagine;
        })
      })
    ).subscribe();
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
