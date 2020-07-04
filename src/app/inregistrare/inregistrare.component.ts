import { Component } from '@angular/core';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'inregistrare',
  templateUrl: './inregistrare.component.html',
  styleUrls: ['./inregistrare.component.css']
})
export class Inregistrare {

  constructor(
    public serviciuDeAutentificare: ServiciuDeAutentificare,
    private stocare: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

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
}