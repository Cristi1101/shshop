import { Component } from '@angular/core';
import { Utilizator } from '../models/utilizator';
import { Router } from '@angular/router';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'contul-meu-modificari',
  templateUrl: './contul-meu-modificari.component.html',
  styleUrls: ['./contul-meu-modificari.component.css']
})

export class ContulMeuModificari {
  utilizator: Utilizator;
  idUtilizator = localStorage.getItem('userUID');
  uploadPercent: Observable<number>;
  
  constructor(
    private ruta: Router,
    public serviciuDeAutentificare: ServiciuDeAutentificare,
    private serviciuUtilizatori: ServiciuUtilizatori,
    private stocare: AngularFireStorage) {
    this.serviciuDeAutentificare.utilizator$.subscribe(utilizator => {
      if (utilizator) {
        this.utilizator = utilizator;
      }
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
          this.utilizator.img = urlImagine;
        })
      })
    ).subscribe();
  }


  salvareModificari(utilizator) {
    this.serviciuUtilizatori.actualizareUtilizator(this.idUtilizator, utilizator);
    this.ruta.navigate(['/contul-meu']);
  }

  inapoi() {
    this.ruta.navigate(['/contul-meu']);
  }
}