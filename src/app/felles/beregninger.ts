import { Termin } from "./termin";
import { Laan } from "./laan";

export class Beregninger {

  beregnAnnuitetTermin(mndRente: number, gjenstaaendeTermin: number, terminNr: number, restgjeld: number): Termin {
    const Rente100 = mndRente / 100;
    const Rente1k100 = 1 + Rente100;
    const forholdGmlNy = Rente100 / (1 - (Rente1k100 ** -gjenstaaendeTermin));
    
    const nyTermin = new Termin();
    nyTermin.terminNr = terminNr; 
    nyTermin.gjenstaaendeTerminer = gjenstaaendeTermin;     
    nyTermin.forholdstall = forholdGmlNy;
    let beregnetTall = 0;
    
    beregnetTall = restgjeld * forholdGmlNy;
    nyTermin.terminbelop = Math.round(beregnetTall);    
    // nyTermin.terminbelop = beregnetTall;    
    
    beregnetTall = restgjeld * Rente100;
    // nyTermin.rentebelop = Math.round(beregnetTall);
    nyTermin.rentebelop = beregnetTall;

    nyTermin.avdrag = nyTermin.terminbelop - nyTermin.rentebelop;
    // nyTermin.restLaanebelop =  Math.round(restgjeld - nyTermin.avdrag);
    nyTermin.restLaanebelop =  restgjeld - nyTermin.avdrag;
    return nyTermin;
  }

  beregnAnnuitet(mndRente: number, antallTerminer: number, gjeld: number): number {
    let termin = 0;
    const Rente100 = mndRente / 100;
    const Rente1k100 = 1 + Rente100;
    const forholdGmlNy = Rente100 / (1 - (Rente1k100 ** -antallTerminer));
    termin = Math.round(gjeld * forholdGmlNy);
    return termin;
  }

  beregnTerminerNy(laan: Laan): Termin[] {
    const Rente100 = laan.mndRente() / 100;
    const terminer: Termin[] = new Array();
    this.sjekkTerminer(laan);
    let gjeldendeTermin = 0;
    let gjeld = laan.laanebelop;
    let terminNr = laan.antallTerminer();
    laan.terminBelop = this.beregnAnnuitet(laan.mndRente(), laan.antallTerminer(), laan.laanebelop);

    for (let index = laan.antallTerminer() - 1; index >= 0; index--) {
      gjeldendeTermin = ++gjeldendeTermin;
      const nyTermin = new Termin();
      nyTermin.terminNr = gjeldendeTermin;
      nyTermin.terminbelop = laan.terminBelop;
      nyTermin.rentebelop = Math.round(gjeld * Rente100);
      nyTermin.avdrag = nyTermin.terminbelop - nyTermin.rentebelop;
      nyTermin.gjenstaaendeTerminer = index;
      nyTermin.restLaanebelop = gjeld - nyTermin.avdrag;
      terminer.push(nyTermin);
      gjeld = nyTermin.restLaanebelop;
      terminNr = index;                   
    }
    return terminer;
  }
  beregnTerminer(laan: Laan): Termin[] {
    const terminer: Termin[] = new Array();
    this.sjekkTerminer(laan);
    let gjeldendeTermin = 0;
    let gjeld = laan.laanebelop;
    let terminNr = laan.antallTerminer();
    for (let index = laan.antallTerminer() - 1; index >= 0; index--) {
      gjeldendeTermin = ++gjeldendeTermin;
      const nyTermin = this.beregnAnnuitetTermin(laan.mndRente(), terminNr, gjeldendeTermin, gjeld);
      if (gjeldendeTermin === laan.antallTerminer()) {
        nyTermin.terminbelop = nyTermin.terminbelop + nyTermin.restLaanebelop;
        nyTermin.restLaanebelop = 0;
      }
      terminer.push(nyTermin);
      gjeld = nyTermin.restLaanebelop;
      terminNr = index;                   
    }
     if (terminer.length > 0) {
      laan.terminBelop = terminer[0].terminbelop;
    }
    return terminer;
  }

  sjekkTerminer(laan: Laan): void {
    if (laan.antallAar === 0 && laan.terminBelop > 0) {
        this.finnAntallTerminer(laan);
    } else {
      laan.antallMnd = 0;
    }
  }

    finnAntallTerminer(laan: Laan): void {
        let antall = 0;
        const Rente100 = laan.mndRente() / 100;
        const Rente1k100 = 1 + Rente100;
        const overbrok = 1 - (laan.laanebelop * Rente100 / laan.terminBelop);
        antall = Math.round(- (Math.log(overbrok) / Math.log(Rente1k100)));
        laan.antallAar = Math.floor(antall / 12);
        laan.antallMnd = antall - (laan.antallAar * 12);
    }

}
