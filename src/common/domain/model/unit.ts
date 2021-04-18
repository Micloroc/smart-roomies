import { Column } from 'typeorm';

export class Unit {
  private static readonly GRAMS_VALUE = 'grams';
  private static readonly MILLILITERS_VALUE = 'milliliters';
  private static readonly GENERIC_VALUE = 'generic';

  @Column({ name: 'value' })
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static gramsUnit() {
    return new Unit(Unit.GRAMS_VALUE);
  }

  public static millilitersUnit() {
    return new Unit(Unit.MILLILITERS_VALUE);
  }

  public static genericUnit() {
    return new Unit(Unit.GENERIC_VALUE);
  }

  public static allUnits() {
    return [this.gramsUnit(), this.millilitersUnit(), this.genericUnit()];
  }
}
