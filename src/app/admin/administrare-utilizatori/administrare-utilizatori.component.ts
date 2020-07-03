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
  tableResource: DataTableResource<Utilizator>;
  items: Utilizator[] = [];
  itemCount: number;

  constructor(private serviciuUtilizatori: ServiciuUtilizatori) {
    this.subscription = this.serviciuUtilizatori.primesteTotiUtilizatorii().subscribe(users => {
      this.utilizatori = users;
      this.initializeTable(users);
    });
  }

  private initializeTable(users: Utilizator[]) {
    this.tableResource = new DataTableResource(users);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredUsers = (query) ?
      this.utilizatori.filter(p => p.email.toLowerCase().includes(query.toLowerCase())) :
      this.utilizatori;
    this.initializeTable(filteredUsers);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
