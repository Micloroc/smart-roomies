import { Injectable } from '@nestjs/common';
import { MongooseUserRepository } from '../../../user/infrastructure/persistence/mongoose-user-repository.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../user/domain/user.repository';
import { User } from '../../../user/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findById(email);


  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
