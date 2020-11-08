import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRepository } from '../../domain/user.repository';

@Resolver('User')
export class UserResolvers {
  constructor(
    private userRepository: UserRepository,
  ) {}

  @Query('user')
  async getUser(@Args('id') id: string) {
    return this.userRepository.findById(id);
  }
}