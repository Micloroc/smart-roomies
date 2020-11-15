import {Model} from "mongoose";
import {UserDocument} from "./user.document";
import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../domain/repositories/user.repository";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../../domain/models/user.entity";

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async save(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email: email}).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
