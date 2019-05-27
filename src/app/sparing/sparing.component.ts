import { Component, OnInit } from '@angular/core';
import { Sparing } from '../felles/sparing';

@Component({
  selector: 'app-sparing',
  templateUrl: './sparing.component.html',
  styleUrls: ['./sparing.component.css']
})
export class SparingComponent implements OnInit {

  minSparing: Sparing;

  constructor() { }

  ngOnInit() {
    this.initVerdier();
  }

  initVerdier(): void {
    const lagretSparing = JSON.parse(localStorage.getItem('sparing'));
    this.minSparing = new Sparing();
    if (lagretSparing !== null) {            
      this.minSparing.saldo = lagretSparing.saldo;
      this.minSparing.aarligRente = lagretSparing.aarligRente;
      this.minSparing.antallAar = lagretSparing.antallAar;
      this.minSparing.mndspareBelop = lagretSparing.mndspareBelop;
    } 

  }

  beregnSparing(): void {
    console.log('Beregn sparing trykket');
    localStorage.setItem('sparing', JSON.stringify(this.minSparing));
  }

}
