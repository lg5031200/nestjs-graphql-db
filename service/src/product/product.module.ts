import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductResolver } from './resolver/product.resolver';
import { ProductService } from './service/product.service';
import { Product, ProductSchema } from './model/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
