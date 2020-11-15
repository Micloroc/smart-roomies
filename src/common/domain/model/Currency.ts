export class Currency {
    constructor(currency: string) {
        this.currency = currency;
    }
    public static readonly EUR_CURRENCY: string = 'eur';

    private currency: string;
}