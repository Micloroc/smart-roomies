import { User } from '../models/user.entity';

export abstract class UserRepository {
  abstract async findById(id: string): Promise<User>;

  abstract async findByEmail(email: string): Promise<User>;

  abstract async findAll(): Promise<User[]>;

  abstract async save(user: User): Promise<User>;
}
