import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductInput } from '../input/create-product.input';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findOneById(id: string) {
    return this.productModel.findById(id).exec();
  }

  findAll(params) {
    return this.productModel.find().exec();
  }

  create(data: CreateProductInput) {
    const newData = new this.productModel(data);
    console.log(newData);

    return newData.save();
  }
}
