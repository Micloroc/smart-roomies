import { Injectable } from '@nestjs/common';
import { IngredientRepository } from '../../../domain/repositories/ingredient.repository';
import { Ingredient } from '../../../domain/models/ingredient.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(Ingredient)
export class MysqlIngredientRepository
  extends Repository<Ingredient>
  implements IngredientRepository {
  async findById(id: string): Promise<Ingredient> {
    return this.findOne(id);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.find();
  }
}
