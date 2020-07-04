import { Component } from '@angular/core';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.css']
})
export class Autentificare {
  constructor(public serviciuDeAutentificare: ServiciuDeAutentificare) { }
}
