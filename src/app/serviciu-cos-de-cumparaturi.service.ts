import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Produs } from './models/produs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciuCosDeCumparaturi {

  constructor(private bazaDeDate: AngularFireDatabase) { }

  private creareCosDeCumparaturi(){
    return this.bazaDeDate.list('/cos-de-cumparaturi').push({
      dataCrearii: new Date().getTime() 
    });
  }

  async primesteCosulDeCumparaturi()  {
    let idCosDeCumparaturi = await this.primesteSauCreeazaIdCosDeCumparaturi();
    return this.bazaDeDate.object('/cos-de-cumparaturi/' + idCosDeCumparaturi);
  }

  primesteProdusulDinCos(idCosDeCumparaturi: string, idProdus: string){
    return this.bazaDeDate.object('/cos-de-cumparaturi/' + idCosDeCumparaturi + '/produse/' + idProdus);
  }

  private async primesteSauCreeazaIdCosDeCumparaturi(): Promise<string> {
    let idCosDeCumparaturi = localStorage.getItem('cartId');
    if(idCosDeCumparaturi) return idCosDeCumparaturi;

    let rezultat = await this.creareCosDeCumparaturi();
    localStorage.setItem('cartId', rezultat.key);
    return rezultat.key;
  }

  async adaugaInCosulDeCumparaturi(produs: Produs) {
    this.actualizareCantitateProduse(produs, 1);
  }

  async stergeDinCosulDeCumparaturi(produs: Produs){
    this.actualizareCantitateProduse(produs, -1);
  }

  async stergeCosulDeCumparaturi(){
    let idCosDeCumparaturi = await this.primesteSauCreeazaIdCosDeCumparaturi();
    this.bazaDeDate.object('/cos-de-cumparaturi/' + idCosDeCumparaturi + '/produse').remove();
  }

  private async actualizareCantitateProduse(produs: Produs, schimbareCantitate: number){
    let idCosDeCumparaturi = await this.primesteSauCreeazaIdCosDeCumparaturi();
    let element = this.primesteProdusulDinCos(idCosDeCumparaturi, produs.key);

    element.snapshotChanges().pipe(take(1)).subscribe((data) => {
      let cantitateAuxiliara = (data.payload.child('/cantitate').val() || 0) + schimbareCantitate;
      if(cantitateAuxiliara === 0) element.remove();
      else
        element.update({ produs: produs, cantitate: cantitateAuxiliara });
        if(cantitateAuxiliara == 1){
          window.location.reload();
        }
    });
  }
}
