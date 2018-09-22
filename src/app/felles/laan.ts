import { Termin } from "./termin";

export class Laan {
    navn: string;
    trekkdag: number;
    laanebelop: number;
    aarligRente: number;
    antallAar: number;
    antallMnd: number;
    terminBelop: number; 

    constructor() {
        this.laanebelop = 0;
        this.aarligRente = 0;
        this.antallAar = 0;
        this.antallMnd = 0;
        this.terminBelop = 0;
     }

    antallTerminer(): number {
        return (this.antallAar * 12) + this.antallMnd;
    }

    // beregnTerminer(): number {
    //     return this.antallAar * 12;
    // }

    mndRente(): number {
        return this.aarligRente / 12;
    } 

} 
