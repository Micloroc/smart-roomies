import { Injectable } from '@nestjs/common';
import { MongooseUserRepository } from '../user/infrastructure/persistence/mongoose-user-repository.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/domain/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return await this.userRepository.findById(username);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
