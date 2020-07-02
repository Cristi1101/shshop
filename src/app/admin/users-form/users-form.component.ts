import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})

export class UsersFormComponent {
  users;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.userService.getUser(this.id).pipe(take(1)).subscribe(p => (this.users = p));
  }

  save(users) {
    this.userService.update(this.id, users);
    this.router.navigate(['/admin/users']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.delete(this.id);
    this.router.navigate(['/admin/users']);
  }

  cancel() {
    this.router.navigate(['/admin/users']);
  }
}
