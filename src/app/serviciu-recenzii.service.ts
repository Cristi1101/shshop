import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Recenzii } from './models/recenzii';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciuRecenzii {
  constructor(
    private bazaDeDate: AngularFireDatabase,
    private ruta: Router) { }

  idUtilizator = localStorage.getItem('userUID');
  produse;

  creareRecenzie(recenzie, produs) {
    return this.bazaDeDate.list('/produse/' + produs + '/recenzii').push(recenzie);
  }

  primesteRecenziile(produs) {
    return this.bazaDeDate.list<Recenzii>('/produse/' + produs + '/recenzii').valueChanges();
  }

  primesteToateRecenziile(produs) {
    return this.bazaDeDate.list<Recenzii>('/produse/' + produs + '/recenzii').snapshotChanges().pipe(
      map(schimbari =>
        schimbari.map(c => {
          const data = c.payload.val() as Recenzii;
          const key = c.payload.key;
          return { key, ...data };
        })
      )
    );
  }

  modificareRecenzie(idProdus, idRecenzie, recenzie){
    return this.bazaDeDate.object('/produse/' + idProdus + '/recenzii/' + idRecenzie).update(recenzie);
  }

  primesteRecenziileProdusului(idProdus) {
    return this.bazaDeDate.object('/produse/' + idProdus + '/recenzii').snapshotChanges();
  }

  actualizareRecenzie(idProdus, produs, idRecenzie) {
    return this.bazaDeDate.object('/produse/' + idProdus + '/recenzii/' + idRecenzie).update(produs); 
  }

  actualizareDateRecenzie(idProdus, idRecenzie, steleRecenzie, continutRecenzie, idUtilizator){
    const referintaRecenzie = this.bazaDeDate.object('/produse/' + idProdus + '/recenzii/' + idRecenzie);
    const dateRecenzie: Recenzii = {
      stele: steleRecenzie,
      continut: continutRecenzie,
      uid: idUtilizator
    }
    referintaRecenzie.update(dateRecenzie);
    this.ruta.navigate(['/recenzii']);
  }

  stergeRecenzia(idProdus, idRecenzie) {
    this.bazaDeDate.object('/produse/' + idProdus + '/recenzii/' + idRecenzie).remove();
    window.location.reload();
  }
}
