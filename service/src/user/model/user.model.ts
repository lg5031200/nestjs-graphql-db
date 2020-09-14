import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  @Prop()
  id: string;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  email: string;

  @Field({ nullable: true })
  @Prop()
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
