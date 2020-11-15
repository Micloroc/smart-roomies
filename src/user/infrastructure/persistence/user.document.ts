import { Document } from 'mongoose';
import { User } from '../../domain/models/user.entity';

export type UserDocument = User & Document;