import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ShoppingListRepository } from '../../domain/repositories/shopping-list.repository';
import { ShoppingList } from '../../domain/model/shopping-list.entity';

@Injectable()
@EntityRepository(ShoppingList)
export class MysqlShoppingListRepository extends Repository<ShoppingList>
  implements ShoppingListRepository {
  async findById(id: string): Promise<ShoppingList> {
    return this.findOne(id);
  }

  async findAll(): Promise<ShoppingList[]> {
    return this.find();
  }
}
