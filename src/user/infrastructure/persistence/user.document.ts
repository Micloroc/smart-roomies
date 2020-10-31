import { Document } from 'mongoose';
import { User } from '../../domain/user.entity';

export type UserDocument = User & Document;