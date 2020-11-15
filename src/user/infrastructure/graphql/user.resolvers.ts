import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRepository } from '../../domain/repositories/user.repository';

@Resolver('User')
export class UserResolvers {
  constructor(
    private userRepository: UserRepository,
  ) {}

  @Query('user')
  async getUser(@Args('id') id: string) {
    console.log(1);
    return this.userRepository.findById(id);
  }
}