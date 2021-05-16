import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from '../../domain/repositories/user.repository';

@Resolver('User')
export class UserResolvers {
  constructor(private userRepository: UserRepository) {}

  @Query('user')
  async user(@Args('id') id: string) {
    return this.userRepository.findById(id);
  }

  @Query('userByEmail')
  async userByEmail(@Args('email') email: string) {
    return this.userRepository.findByEmail(email);
  }
}
