import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// import { SignUpInput } from '../input/signup.input';
import { LoginInput } from '../input/login.input';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

  @Mutation(() => User)
  async login(@Args('loginData') loginData: LoginInput) {
    let user = await this.UserService.getUserByEmail(loginData);
    if (!user) {
      const newUserData = {
        ...loginData,
        username: 'newUser',
      };
      user = await this.UserService.createUser(newUserData);
    }

    console.log(user);

    // return {
    //   id: user._id,
    //   username: user.name,
    //   password: user.password,
    //   email: user.email
    // };

    return this.UserService.createToken({
      id: user._id,
      email: user.email,
      password: user.password,
      username: user.username
    });
  }
}
