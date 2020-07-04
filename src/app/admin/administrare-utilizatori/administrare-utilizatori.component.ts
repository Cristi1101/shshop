import { Component, OnInit, OnDestroy } from '@angular/core';
import { Utilizator } from 'src/app/models/utilizator';
import { DataTableResource } from 'angular7-data-table';
import { Subscription } from 'rxjs/Subscription';
import { ServiciuUtilizatori } from 'src/app/serviciu-utilizatori.service';

@Component({
  selector: 'administrare-utilizatori',
  templateUrl: './administrare-utilizatori.component.html',
  styleUrls: ['./administrare-utilizatori.component.css']
})
export class AdministrareUtilizatori implements OnInit, OnDestroy {
  utilizatori: Utilizator[] = [];
  subscription: Subscription;
  tabel: DataTableResource<Utilizator>;
  elemente: Utilizator[] = [];
  numarElemente: number;

  constructor(private serviciuUtilizatori: ServiciuUtilizatori) {
    this.subscription = this.serviciuUtilizatori.primesteTotiUtilizatorii().subscribe(utilizatori => {
      this.utilizatori = utilizatori;
      this.initializareTabel(utilizatori);
    });
  }

  private initializareTabel(utilizatori: Utilizator[]) {
    this.tabel = new DataTableResource(utilizatori);
    this.tabel.query({ offset: 0 })
      .then(items => this.elemente = items);
    this.tabel.count()
      .then(count => this.numarElemente = count);
  }

  actualizareElemente(parametrii) {
    if (!this.tabel) return;

    this.tabel.query(parametrii)
      .then(items => this.elemente = items);
  }

  filter(text: string) {
    let utilizatoriFiltrati = (text) ?
      this.utilizatori.filter(utilizator => utilizator.email.toLowerCase().includes(text.toLowerCase())) :
      this.utilizatori;
    this.initializareTabel(utilizatoriFiltrati);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
