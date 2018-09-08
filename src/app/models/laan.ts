import { Termin } from "./termin";

export class Laan {
    laanebelop: number;
    aarligRente: number;
    antallAar: number;
    antallTerminer: number;
    terminBelop: number;

    constructor() {
        this.laanebelop = 0;
        this.aarligRente = 0;
        this.antallAar = 0;
        this.antallTerminer = 0;
        this.terminBelop = 0;
     }

    totaltAntallTerminer(): number {
        return (this.antallAar * 12) + this.antallTerminer;
    }

    beregnTerminer(): number {
        return this.antallAar * 12;
    }

    mndRente(): number {
        return this.aarligRente / 12;
    }


} 
