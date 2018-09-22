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
  finnTerminbelop: boolean;
  typeBeregning: string;

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
    this.finnTerminbelop = true;
    // this.typeBeregning = "belop";
    this.typeBeregning = "termin";
  }

  beregnTerminer(): void {
    if (this.typeBeregning === 'belop') {
      this.mittLaan.terminBelop = 0;
    } else {
      this.mittLaan.antallAar = 0;
      this.mittLaan.antallMnd = 0;
    }
    this.terminer = this.beregning.beregnTerminer(this.mittLaan);
    console.log('Beregning utført');
    localStorage.setItem('lån', JSON.stringify(this.mittLaan));
  }

}
