import {HomeRepository} from "../../domain/repositories/home.repository";
import {Home} from "../../domain/model/home.entity";
import {EntityRepository, Repository} from "typeorm";
import {Injectable} from '@nestjs/common';

@Injectable()
@EntityRepository(Home)
export class MysqlHomeRepository extends Repository<Home> implements HomeRepository {

    async findById(id: string): Promise<Home> {
        return this.findOne(id);
    }

    async findAll(): Promise<Home[]> {
        return this.find();
    }
}
