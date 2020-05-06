import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { DataTableResource } from 'angular7-data-table';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit, OnDestroy {
  users: AppUser[] = [];
  subscription: Subscription;
  tableResource: DataTableResource<AppUser>;
  items: AppUser[] = [];
  itemCount: number;

  constructor(private userService: UserService) { 
    this.subscription = this.userService.getAll().subscribe(users => {
      this.users = users;
      this.initializeTable(users);
    });
  }

  private initializeTable(users: AppUser[]) {
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
      this.users.filter(p => p.firstName.toLowerCase().includes(query.toLowerCase())) :
      this.users;

    this.initializeTable(filteredUsers);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
