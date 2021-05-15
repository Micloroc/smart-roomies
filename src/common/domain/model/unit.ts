import { Column } from 'typeorm';
import { UnitNotFound } from '../exception/unit-not-found.exception';

export class Unit {
  private static readonly MILLI_GRAMS_VALUE = 'milligrams';
  private static readonly GRAMS_VALUE = 'grams';
  private static readonly KILO_GRAMS_VALUE = 'kilograms';
  private static readonly MILLILITERS_VALUE = 'milliliters';
  private static readonly LITERS_VALUE = 'liters';
  private static readonly GENERIC_VALUE = 'generic';

  private static readonly WEIGHT_TYPE = 'weight';
  private static readonly VOLUME_TYPE = 'volume';
  private static readonly GENERIC_TYPE = 'generic';

  private static readonly KILO_SCALE_MULTIPLIER = 3;
  private static readonly REGULAR_SCALE_MULTIPLIER = 2;
  private static readonly MILLI_SCALE_MULTIPLIER = 1;

  @Column({ name: 'value' })
  public readonly value: string;
  @Column({ name: 'type' })
  public readonly type: string;
  @Column({ name: 'scale_multiplier' })
  public readonly scaleMultiplier: number;

  constructor(value: string, type: string, scaleMultiplier: number) {
    this.value = value;
    this.type = type;
    this.scaleMultiplier = scaleMultiplier;
  }
  public static unitByValue(unitValue: string): Unit {
    const foundUnit = Unit.allUnits().find(
      (unit: Unit) => unit.value === unitValue,
    );
    if (!foundUnit) throw new UnitNotFound();
    return foundUnit;
  }

  public static milligramsUnit() {
    return new Unit(
      Unit.MILLI_GRAMS_VALUE,
      Unit.WEIGHT_TYPE,
      Unit.MILLI_SCALE_MULTIPLIER,
    );
  }

  public static gramsUnit() {
    return new Unit(
      Unit.GRAMS_VALUE,
      Unit.WEIGHT_TYPE,
      Unit.REGULAR_SCALE_MULTIPLIER,
    );
  }

  public static kilogramsUnit() {
    return new Unit(
      Unit.KILO_GRAMS_VALUE,
      Unit.WEIGHT_TYPE,
      Unit.KILO_SCALE_MULTIPLIER,
    );
  }

  public static millilitersUnit() {
    return new Unit(
      Unit.MILLILITERS_VALUE,
      Unit.VOLUME_TYPE,
      Unit.MILLI_SCALE_MULTIPLIER,
    );
  }

  public static litersUnit() {
    return new Unit(
      Unit.LITERS_VALUE,
      Unit.VOLUME_TYPE,
      Unit.REGULAR_SCALE_MULTIPLIER,
    );
  }

  public static genericUnit() {
    return new Unit(
      Unit.GENERIC_VALUE,
      Unit.GENERIC_TYPE,
      Unit.REGULAR_SCALE_MULTIPLIER,
    );
  }

  public static allUnits() {
    return [
      this.genericUnit(),
      this.milligramsUnit(),
      this.gramsUnit(),
      this.kilogramsUnit(),
      this.millilitersUnit(),
      this.litersUnit(),
    ];
  }
}
