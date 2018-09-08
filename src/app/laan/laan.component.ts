import { Component, OnInit,  } from '@angular/core';
import { Termin } from '../felles/termin';
import { Laan } from '../felles/laan';
import { Beregninger } from '../felles/beregninger';

@Component({
  selector: 'app-laan',
  templateUrl: './laan.component.html',
  styleUrls: ['./laan.component.css']
})
export class LaanComponent implements OnInit {

  mittLaan: Laan;
  beregning: Beregninger;  
  terminer: Termin[];

  constructor() { }

  ngOnInit() {
    this.initVerdier();
  }

  initVerdier(): void {
    this.beregning = new Beregninger();
    const lagretLaan = JSON.parse(localStorage.getItem('lån'));
    this.mittLaan = new Laan();
    if (lagretLaan !== null) {            
      this.mittLaan.laanebelop = lagretLaan.laanebelop;
      this.mittLaan.aarligRente = lagretLaan.aarligRente;
      this.mittLaan.antallAar = lagretLaan.antallAar;
      this.mittLaan.terminBelop = lagretLaan.terminBelop;
    } 
    this.terminer = new Array();
  }

  beregnTerminer(): void {
    this.terminer = this.beregning.beregnTerminer(this.mittLaan);
    // if (this.terminer.length > 0) {
    //   this.mittLaan.terminBelop = 
    // }
    console.log('Beregning utført');
    localStorage.setItem('lån', JSON.stringify(this.mittLaan));
  }

}
