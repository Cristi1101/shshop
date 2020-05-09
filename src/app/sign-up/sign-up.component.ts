import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage) { }


    uploadPercent: Observable<number>;
    urlImage: Observable<string>;

  ngOnInit(): void {
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'uploads/' + id;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((url) => {
          this.urlImage = url;
          console.log("url:", this.urlImage);
        })
      })
    ).subscribe();
  }
}
