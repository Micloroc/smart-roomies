import {Injectable} from "@nestjs/common";
import {UserRepository} from '../../domain/repositories/user.repository';
import {User} from '../../domain/models/user.entity';
import {EntityRepository, Repository} from 'typeorm';

@Injectable()
@EntityRepository(User)
export class MysqlUserRepository extends Repository<User> implements UserRepository {

    async findById(id: string): Promise<User> {
        return this.findOne(id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.createQueryBuilder('user')
            .where("user.email = :email", {email: email})
            .getOne();
    }

    async findAll(): Promise<User[]> {
        return this.find();
    }
}
