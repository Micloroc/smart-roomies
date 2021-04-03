import {Column} from 'typeorm';

export class Unit {
    static readonly GRAMS_UNIT = 'grams';
    static readonly MILLILITERS_UNIT = 'milliliters';
    static readonly GENERIC_UNIT = 'generic';

    @Column({name: 'value'})
    public readonly value: string;

    constructor(amount: string) {
        this.value = amount;
    }

    public static gramsUnit() {
        return new Unit(Unit.GRAMS_UNIT);
    }

    public static millilitersUnit() {
        return new Unit(Unit.MILLILITERS_UNIT);
    }

    public static genericUnit() {
        return new Unit(Unit.MILLILITERS_UNIT);
    }
}
