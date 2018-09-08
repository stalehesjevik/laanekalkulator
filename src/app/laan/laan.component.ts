import { Component, OnInit,  } from '@angular/core';
import { Termin } from '../models/termin';
import { Laan } from '../models/laan';

@Component({
  selector: 'app-laan',
  templateUrl: './laan.component.html',
  styleUrls: ['./laan.component.css']
})
export class LaanComponent implements OnInit {

  mittLaan: Laan;
  terminBelop: number;
  terminer: Termin[];

  constructor() { }

  ngOnInit() {
    this.initVerdier();
  }

  initVerdier(): void {
    const lagretLaan = JSON.parse(localStorage.getItem('lån'));
    this.mittLaan = new Laan();
    if (lagretLaan !== null) {            
      this.mittLaan.laanebelop = lagretLaan.laanebelop;
      this.mittLaan.aarligRente = lagretLaan.aarligRente;
      this.mittLaan.antallAar = lagretLaan.antallAar;
      this.mittLaan.terminBelop = lagretLaan.terminBelop;
    } 
    this.terminBelop = 0;
    this.terminer = new Array();
  }

  beregnTerminBelop(gjenstaaendeTermin: number, terminNr: number, restgjeld: number): Termin {
    const Rente100 = this.mittLaan.mndRente() / 100;
    const Rente1k100 = 1 + Rente100;
    const forholdGmlNy = Rente100 / (1 - (Rente1k100 ** -gjenstaaendeTermin));
    
    const nyTermin = new Termin();
    nyTermin.terminNr = terminNr; 
    nyTermin.gjenstaaendeTerminer = gjenstaaendeTermin; 
    let beregnetTall = 0;
    // nyTermin.terminbelop = Math.round(restgjeld * forholdGmlNy);    
    // nyTermin.rentebelop = Math.round(restgjeld * Rente100);
    beregnetTall = restgjeld * forholdGmlNy;
    nyTermin.terminbelop = Math.round(beregnetTall);    
    beregnetTall = restgjeld * Rente100;
    nyTermin.rentebelop = Math.round(beregnetTall);
    // nyTermin.terminbelop = restgjeld * forholdGmlNy;    
    //  nyTermin.rentebelop = restgjeld * Rente100;

    nyTermin.avdrag = nyTermin.terminbelop - nyTermin.rentebelop;
    nyTermin.restLaanebelop = restgjeld - nyTermin.avdrag;
    return nyTermin;
  }

  beregnTerminer(): void {
    this.terminer = new Array();
    let gjeldendeTermin = 0;
    let gjeld = this.mittLaan.laanebelop;
    let terminNr = this.mittLaan.totaltAntallTerminer();
    for (let index = this.mittLaan.totaltAntallTerminer() - 1; index >= 0; index--) {
      gjeldendeTermin = ++gjeldendeTermin;
      const nyTermin = this.beregnTerminBelop(terminNr, gjeldendeTermin, gjeld);
      this.terminer.push(nyTermin);
      gjeld = nyTermin.restLaanebelop;
      terminNr = index;             
      
    }
    if (this.terminer.length > 0) {
      this.terminBelop = this.terminer[this.terminer.length - 1].terminbelop;
    }
    console.log('Beregning utført');
    localStorage.setItem('lån', JSON.stringify(this.mittLaan));

  }

}
