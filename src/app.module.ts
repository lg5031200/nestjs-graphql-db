import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
    GraphQLModule.forRoot({
      autoSchemaFile: './schema/schema.gql',
    }),
  ],
})
export class AppModule {}
