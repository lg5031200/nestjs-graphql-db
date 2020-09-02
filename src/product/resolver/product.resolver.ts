import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput } from '../input/create-product.input';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly ProductService: ProductService) {}

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.ProductService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    return {
      id: product._id,
      name: product.name,
      description: product.description,
    };
  }

  @Query(() => [Product])
  async products(
    @Args('params', { nullable: true }) params: CreateProductInput,
  ): Promise<[Product]> {
    const products = await this.ProductService.findAll(params);
    return products.map(product => {
      return {
        id: product._id,
        name: product.name,
        description: product.description,
      };
    });
  }

  @Mutation(() => Product)
  async addProduct(
    @Args('newProductData') newProductData: CreateProductInput,
  ): Promise<Product> {
    const product = await this.ProductService.create(newProductData);
    console.log(product);

    return {
      id: product._id,
      name: product.name,
      description: product.description,
    };
  }
}
