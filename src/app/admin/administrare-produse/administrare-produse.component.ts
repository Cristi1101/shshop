import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciuProduse } from 'src/app/serviciu-produse.service';
import { Subscription } from 'rxjs/Subscription';
import { Produs } from 'src/app/models/produs';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'administrare-produse',
  templateUrl: './administrare-produse.component.html',
  styleUrls: ['./administrare-produse.component.css']
})

export class AdministrareProduse implements OnInit, OnDestroy {
  produse: Produs[] = [];
  subscription: Subscription;
  tabel: DataTableResource<Produs>;
  elemente: Produs[] = [];
  evidentaElementelor: number;

  constructor(private serviciuProduse: ServiciuProduse) {
    this.subscription = this.serviciuProduse.toateProdusele().subscribe(produse => {
      this.produse = produse;
      this.initializareTabel(produse);
    });
  }

  private initializareTabel(produse: Produs[]) {
    this.tabel = new DataTableResource(produse);
    this.tabel.query({ offset: 0 })
      .then(items => this.elemente = items);
    this.tabel.count()
      .then(count => this.evidentaElementelor = count);
  }

  actualizareElemente(parametrii) {
    if (!this.tabel) return;

    this.tabel.query(parametrii)
      .then(items => this.elemente = items);
  }

  filtrare(text: string) {
    let produseFiltrate = (text) ?
      this.produse.filter(produs => produs.title.toLowerCase().includes(text.toLowerCase())) : this.produse;
    this.initializareTabel(produseFiltrate);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
