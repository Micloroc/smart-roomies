import { Query, Resolver } from '@nestjs/graphql';
import { Unit } from '../../domain/model/unit';

@Resolver('Unit')
export class UnitResolvers {
  @Query('availableUnits')
  availableUnits(): Unit[] {
    console.log(Unit.allUnits());
    return Unit.allUnits();
  }
}
