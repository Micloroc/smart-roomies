import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Meal } from '../../../domain/models/meal.entity';
import { MealRepository } from '../../../domain/repositories/meal.repository';

@Injectable()
@EntityRepository(Meal)
export class MysqlMealRepository
  extends Repository<Meal>
  implements MealRepository {
  async findById(id: string): Promise<Meal> {
    return this.findOneOrFail(id);
  }

  findByHomeId(homeId: string): Promise<Meal[]> {
    return this.find({
      where: { homeId },
    });
  }

  findByCreatorId(creatorId: string): Promise<Meal[]> {
    return this.find({
      where: { _creatorId: creatorId },
    });
  }
  async findAll(): Promise<Meal[]> {
    return this.find();
  }
}
