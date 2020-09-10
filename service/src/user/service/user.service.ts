import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { SignUpInput } from '../input/signup.input';
import { User } from '../model/user.model';
import { LoginInput } from '../input/login.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createToken(user: User) {
    const result =  jwt.sign(user, 'secret');
    console.log(result)
    return result
  }

  createUser(data: SignUpInput) {
    const newData = new this.userModel(data);

    return newData.save();
  }

  async getUserByEmail(data: LoginInput) {
    console.log(data.email)
    // return this.userModel.findOne({ email: data.email });
    const result = await this.userModel.findOne({ email: data.email }).exec();
    console.log(result)

    return result
  }
}
