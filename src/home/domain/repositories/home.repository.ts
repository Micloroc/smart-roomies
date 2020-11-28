import {Home} from "../model/home.entity";

export abstract class HomeRepository {
    abstract async findById(id: string): Promise<Home>;

    abstract async findAll(): Promise<Home[]>;

    abstract async save(home: Home): Promise<Home>;
}
