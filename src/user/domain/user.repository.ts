import { User } from './user.entity';

export abstract class UserRepository {
  abstract async findById(id: string): Promise<User>;

  abstract async findAll(): Promise<User[]>;

  abstract async save(user: User): Promise<User>;
}
