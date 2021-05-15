import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ShoppingListRepository } from '../../domain/repositories/shopping-list.repository';
import { ShoppingList } from '../../domain/model/shopping-list.entity';

@Injectable()
@EntityRepository(ShoppingList)
export class MysqlShoppingListRepository
  extends Repository<ShoppingList>
  implements ShoppingListRepository {
  async findById(id: string): Promise<ShoppingList | undefined> {
    return this.createQueryBuilder('shoppingList')
      .leftJoinAndSelect('shoppingList._items', 'item')
      .where('shoppingList._id = :id')
      .setParameter('id', id)
      .orderBy('item._order', 'ASC')
      .getOne();
  }

  async findAll(): Promise<ShoppingList[]> {
    return this.find();
  }
}
