import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../input/create-product.input';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService {
  fakeProductsDbData = [
    {
      id: '0-create',
      name: 'switch',
      description: 'test',
    },
  ];

  async findOneById(id: string): Promise<Product> {
    return this.fakeProductsDbData.find(product => product.id === id);
  }

  async findAll(params): Promise<Product[]> {
    let result = this.fakeProductsDbData;

    if (params) {
      const { name } = params;

      if (name) {
        result = this.fakeProductsDbData.filter(
          product => product.name === name,
        );
      }
    }

    return result;
  }

  async create(data: CreateProductInput): Promise<Product> {
    const id = this.fakeProductsDbData.length + '-create';
    const newData = {
      id,
      ...data,
      description: data.description || null,
    };

    this.fakeProductsDbData.push(newData);

    return {
      id,
      ...data,
    };
  }
}
