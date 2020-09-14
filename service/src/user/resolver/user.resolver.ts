import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';

import { AuthGuard } from '../auth.guard';
import { User } from '../model/user.model';
import { LoginInput } from '../input/login.input';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@Context('user') user: User) {
    const result = await this.UserService.getUserByEmail(user.email);

    return {
      id: result._id,
      username: result.username,
      password: result.password,
      email: result.email,
    };
  }

  @Mutation(() => User)
  async login(@Args('loginData') loginData: LoginInput) {
    let user = await this.UserService.getUserByEmail(loginData.email);

    if (!user) {
      const newUserData = {
        ...loginData,
        username: 'newUser',
      };
      user = await this.UserService.createUser(newUserData);
    }

    const token = this.UserService.createToken({
      email: user.email,
      password: user.password,
    });

    return {
      id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      token,
    };
  }
}
