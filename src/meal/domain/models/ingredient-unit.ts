import {Column} from 'typeorm';

export class IngredientUnit {
    static readonly GRAMS_UNIT = 'grams';
    static readonly MILLILITERS_UNIT = 'milliliters';
    static readonly GENERIC_UNIT = 'generic';

    @Column({name: 'value'})
    public readonly value: string;

    constructor(amount: string) {
        this.value = amount;
    }

    public static gramsUnit() {
        return new IngredientUnit(IngredientUnit.GRAMS_UNIT);
    }

    public static millilitersUnit() {
        return new IngredientUnit(IngredientUnit.MILLILITERS_UNIT);
    }

    public static genericUnit() {
        return new IngredientUnit(IngredientUnit.MILLILITERS_UNIT);
    }
}
