import { Component } from '@angular/core';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'inregistrare',
  templateUrl: './inregistrare.component.html',
  styleUrls: ['./inregistrare.component.css']
})
export class Inregistrare {

  constructor(
    public auth: ServiciuDeAutentificare,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  onUpload(e) {
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