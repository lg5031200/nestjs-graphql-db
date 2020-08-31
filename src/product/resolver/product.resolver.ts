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
    return product;
  }

  @Query(() => [Product])
  async products(
    @Args('params', { nullable: true }) params: CreateProductInput,
  ): Promise<Product[]> {
    return this.ProductService.findAll(params);
  }

  @Mutation(() => Product)
  async addProduct(
    @Args('newProductData') newProductData: CreateProductInput,
  ): Promise<Product> {
    return this.ProductService.create(newProductData);
  }
}
