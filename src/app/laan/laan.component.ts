import { Component, OnInit,  } from '@angular/core';
import { Termin } from '../models/termin';

@Component({
  selector: 'app-laan',
  templateUrl: './laan.component.html',
  styleUrls: ['./laan.component.css']
})
export class LaanComponent implements OnInit {

  laanebelop: number;
  aarligRente: number;
  manedligRente: number;
  antallAar: number;
  antallTerminer: number;
  totaltAntallTerminer: number;
  terminBelop: number;
  terminer: Termin[];

  constructor() { }

  ngOnInit() {
    this.initVerdier();
    this.beregn();
    const forsteTermin = this.beregnTerminBelop(this.antallTerminer, 1, this.laanebelop);
    this.terminBelop = forsteTermin.terminbelop;
  }

  initVerdier(): void {
    this.laanebelop = 0;
    this.aarligRente = 0;
    this.antallAar = 0;
    this.antallTerminer = 0;
    this.totaltAntallTerminer = 0;
    this.manedligRente = 0;
    this.terminBelop = 0;
    this.terminer = new Array();
  }

  beregn(): void {
    this.antallTerminer = this.antallAar * 12;
    this.beregnMndRente();
  }

  beregnMndRente(): void {
    this.manedligRente = this.aarligRente / 12;
  }

  beregnTerminBelop(gjenstaaendeTermin: number, terminNr: number, restgjeld: number): Termin {
    const Rente100 = this.manedligRente / 100;
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
    this.beregn();
    let gjeldendeTermin = 0;
    let gjeld = this.laanebelop;
    let terminNr = this.antallTerminer;
    for (let index = this.antallTerminer - 1; index >= 0; index--) {
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

  }

}
