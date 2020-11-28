import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {Meal} from '../../../domain/models/meal.entity';
import {MealRepository} from '../../../domain/repositories/meal.repository';


@Injectable()
@EntityRepository(Meal)
export class MysqlMealRepository extends Repository<Meal> implements MealRepository {
    async findById(id: string): Promise<Meal> {
        return this.findOne(id);
    }

    async findAll(): Promise<Meal[]> {
        return this.find();
    }
}
