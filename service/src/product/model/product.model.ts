import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Product extends Document {
  @Field(() => ID)
  @Prop()
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
