import { Component, OnInit } from '@angular/core';
import { ServiciuCategorii } from 'src/app/serviciu-categorii.service';
import { ServiciuProduse } from 'src/app/serviciu-produse.service';
import { ServiciuCulori } from 'src/app/serviciu-culori.service';
import { Router } from '@angular/router';
import { ServiciuSubcategorii } from 'src/app/serviciu-subcategorii.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(
    private ruta: Router,
    private serviciuCategorii: ServiciuCategorii,
    private serviciuSubcategorii: ServiciuSubcategorii,
    private serviciuCulori: ServiciuCulori,
    public serviciuProduse: ServiciuProduse,
    private stocare: AngularFireStorage) {

    this.categorii$ = serviciuCategorii.toateCategoriile();
    this.subcategorii$ = serviciuSubcategorii.primesteSubcategoriile();
    this.culori$ = serviciuCulori.primesteCulorile();

    serviciuSubcategorii.primesteSubcategoriile().subscribe(date => {
      this.subcategorii = date;
    });
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
          this.urlImage = urlImagine;
        })
      })
    ).subscribe();
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
    return this.subcategorii.filter(subcategorii => subcategorii.payload.val().idParinte == parametrii);
  }
}