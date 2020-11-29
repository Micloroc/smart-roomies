import {Column} from "typeorm";

export class Currency {
    public static readonly EUR_CURRENCY: string = 'eur';
    @Column({name: 'currency'})
    private currency: string;

    constructor(currency: string) {
        this.currency = currency;
    }
}