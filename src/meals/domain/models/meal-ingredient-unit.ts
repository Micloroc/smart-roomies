export class MealIngredientUnit {
    static readonly GRAMS_UNIT = 'grams';
    static readonly MILLILITERS_UNIT = 'grams';
    private value: string;


    private constructor(value: string) {
        this.value = value;
    }

    public static gramsUnit() {
        return new MealIngredientUnit(MealIngredientUnit.GRAMS_UNIT);
    }

    public static millilitersUnit() {
        return new MealIngredientUnit(MealIngredientUnit.MILLILITERS_UNIT);
    }
}
