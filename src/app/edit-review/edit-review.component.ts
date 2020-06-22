import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  state;
  //id;

  constructor(private router: Router) {
    //   this.id = this.route.snapshot.paramMap.get('id');
    //   if (this.id) 
    //     this.userService.getUser(this.id).pipe(take(1)).subscribe(p => (this.users = p));
    //     console.log("id-ul userului:", this.id);

    this.state = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    ).subscribe(object => {
      this.state = object;
      console.log("recenzie: ", this.state);
    });

  }

}
