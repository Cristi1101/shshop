import { Component } from '@angular/core';
import { ServiciuUtilizatori } from 'src/app/serviciu-utilizatori.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'administrare-utilizatori-detalii',
  templateUrl: './administrare-utilizatori-detalii.component.html',
  styleUrls: ['./administrare-utilizatori-detalii.component.css']
})

export class AdministrareUtilizatoriDetalii {
  users;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: ServiciuUtilizatori) {
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
