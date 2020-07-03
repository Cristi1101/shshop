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
  users: Utilizator[] = [];
  subscription: Subscription;
  tableResource: DataTableResource<Utilizator>;
  items: Utilizator[] = [];
  itemCount: number;

  constructor(private userService: ServiciuUtilizatori) {
    this.subscription = this.userService.getAll().subscribe(users => {
      this.users = users;
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
      this.users.filter(p => p.email.toLowerCase().includes(query.toLowerCase())) :
      this.users;
    this.initializeTable(filteredUsers);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
