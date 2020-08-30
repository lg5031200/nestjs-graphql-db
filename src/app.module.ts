import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    GraphQLModule.forRoot({
      autoSchemaFile: './schema/schema.gql',
    }),
  ],
})
export class AppModule { }