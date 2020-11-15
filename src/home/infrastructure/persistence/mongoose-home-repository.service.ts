import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {HomeRepository} from "../../domain/repositories/home.repository";
import {HomeDocument} from "./home.document";
import {Home} from "../../domain/model/home.entity";

@Injectable()
export class MongooseHomeRepository implements HomeRepository {
    constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>) {
    }

    async save(home: Home): Promise<Home> {
        const createdHome = new this.homeModel(home);
        return createdHome.save();
    }

    async findById(id: string): Promise<Home> {
        return this.homeModel.findById(id).exec();
    }

    async findAll(): Promise<Home[]> {
        return this.homeModel.find().exec();
    }
}
