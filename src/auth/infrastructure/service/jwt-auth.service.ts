import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { User } from '../../../user/domain/models/user.entity';
import { AuthService } from '../../application/service/auth.service';

@Injectable()
export class JwtAuthService implements AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  login(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
