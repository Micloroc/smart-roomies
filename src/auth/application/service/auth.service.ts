import { User } from '../../../user/domain/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AuthService {
  abstract login(user: User): string;
}