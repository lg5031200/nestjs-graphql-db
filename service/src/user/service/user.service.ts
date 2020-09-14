import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { SignUpInput } from '../input/signup.input';
import { User } from '../model/user.model';
import { LoginInput } from '../input/login.input';

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
}
