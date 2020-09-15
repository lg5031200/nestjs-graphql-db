import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { User } from '../model/user.model';
import { MyContext } from '../interface/context';
import { LoginInput } from '../input/login.input';
import { SignUpInput } from '../input/signup.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private ConfigService: ConfigService,
  ) {}

  createToken(input: LoginInput) {
    const secret = this.ConfigService.get('JWT_SECRET');

    return jwt.sign(input, secret);
  }

  createUser(input: SignUpInput) {
    const newUser = new this.userModel(input);

    return newUser.save();
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();

    return user;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();

    return user;
  }

  async logout(ctx: MyContext) {
    if (!ctx.req.headers.authorization) {
      return false;
    } else {
      delete ctx.req.headers.authorization;
    }

    return true;
  }
}
