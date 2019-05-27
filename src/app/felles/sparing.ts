
export class Sparing {
    navn: string;
    trekkdag: number;
    saldo: number;
    aarligRente: number;
    antallAar: number;
    antallMnd: number;
    mndspareBelop: number; 

    constructor() {
        this.saldo = 0;
        this.aarligRente = 0;
        this.antallAar = 0;
        this.antallMnd = 0;
        this.mndspareBelop = 0;
     }

    antallTerminer(): number {
        return (this.antallAar * 12) + this.antallMnd;
    }

    mndRente(): number {
        return this.aarligRente / 12;
    } 

} 
